import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSessionAndProfile = async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoadingAuth(false);
        return;
      }

      // Attempt to fetch only the guaranteed columns plus 'role'
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, role, created_at') // Only select columns known to exist for sure + role
        .eq('id', user.id)
        .single();

      let userProfileData = {
        ...user, // Start with Supabase auth user data
        // Attempt to get other fields from user_metadata or set defaults
        name: user.user_metadata?.name || user.email?.split('@')[0],
        username: user.user_metadata?.username || user.email?.split('@')[0],
        avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`,
        banner_url: user.user_metadata?.banner_url || null, // Default to null if not in metadata
        bio: user.user_metadata?.bio || null, // Default to null
        website: user.user_metadata?.website || null, // Default to null
        role: 'user', // Default role
        subscribers_count: 0, // Default
        updated_at: null // Will be null if not in profiles table
      };
      
      if (profile) {
        // If profile fetch was successful (even with minimal columns), merge it
        userProfileData = { ...userProfileData, ...profile };
      } else if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 (no rows found) is somewhat expected if trigger failed or hasn't run.
        // Log other errors.
        console.error('Error fetching profile (minimal):', profileError);
        toast({ title: "Profile Error", description: `Could not load your profile. ${profileError.message}`, variant: "destructive" });
      }
      
      setCurrentUser(userProfileData);
      setLoadingAuth(false);
    };
    
    const getInitialSession = async () => {
      setLoadingAuth(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching initial session:", error);
        setLoadingAuth(false);
        return;
      }
      await fetchSessionAndProfile(session?.user || null);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoadingAuth(true);
      await fetchSessionAndProfile(session?.user || null);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [toast]);

  const login = async (credentials) => {
    setLoadingAuth(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      setLoadingAuth(false);
      return { error };
    }
    
    // onAuthStateChange will handle setting currentUser and loading state
    if (data.user) {
      toast({ title: "Login Successful!", description: `Welcome back!` });
    } else {
      setLoadingAuth(false);
    }
    return { user: data.user, error: null };
  };

  const signup = async (credentials) => {
    setLoadingAuth(true);
    // Simplified metadata. The current simplified trigger doesn't use this,
    // but it's good practice if we re-enable a more complex trigger later.
    const metadata = {
      name: credentials.name || credentials.email.split('@')[0], // Provide a default name
      username: credentials.username || credentials.email.split('@')[0] // Provide a default username
      // Other fields (avatar_url, banner_url, bio, website) are not sent
      // as the simplified trigger doesn't use them.
    };

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: metadata 
      }
    });

    if (error) {
      console.error("Signup error details:", error); 
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
      setLoadingAuth(false);
      return { error };
    }
        
    if (data.user) {
      toast({ title: "Signup Successful!", description: "Welcome! Profile will be basic initially." });
    } else {
      setLoadingAuth(false);
    }
    return { user: data.user, error: null };
  };

  const logout = async () => {
    setLoadingAuth(true);
    const { error } = await supabase.auth.signOut();
    setCurrentUser(null); 
    if (error) {
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged Out", description: "You've successfully logged out." });
    }
    setLoadingAuth(false); 
  };
  
  const updateUserProfile = async (updatedData) => {
    if (!currentUser) return { error: { message: "No user logged in." } };
    setLoadingAuth(true);

    // Only attempt to update fields that are likely to exist after manual column creation.
    const profileDataToUpdate = {
      username: updatedData.username,
      name: updatedData.name,
      avatar_url: updatedData.avatar, 
      banner_url: updatedData.banner,
      bio: updatedData.bio,
      website: updatedData.website,
      updated_at: new Date().toISOString(),
    };
    
    Object.keys(profileDataToUpdate).forEach(key => profileDataToUpdate[key] === undefined && delete profileDataToUpdate[key]);

    const { data, error } = await supabase
      .from('profiles')
      .update(profileDataToUpdate)
      .eq('id', currentUser.id)
      // Select all fields you expect after manually adding them
      .select('id, email, name, username, avatar_url, banner_url, bio, website, role, subscribers_count, created_at, updated_at')
      .single();

    if (error) {
      toast({ title: "Profile Update Failed", description: `Ensure all profile columns (name, username, etc.) exist in the database. ${error.message}`, variant: "destructive" });
      setLoadingAuth(false);
      return { error };
    }

    if (data) {
      setCurrentUser(prevUser => ({ ...prevUser, ...data }));
      toast({ title: "Profile Updated", description: "Your cosmic profile has been updated!" });
    }
    setLoadingAuth(false);
    return { data, error: null };
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUserProfile,
    loadingAuth,
    supabase // Exposing supabase client if needed directly by components, though api.js is preferred
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};