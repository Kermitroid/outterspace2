import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VideoCard from '@/components/VideoCard';
import { User, Edit3, ThumbsUp, History, Bookmark, UploadCloud, Settings, Film, Save, Loader2, Image as ImageIcon, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getVideos, getLikedVideos, getHistoryVideos, getSavedVideos, uploadFile } from '@/lib/api'; 
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser, updateUserProfile, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', username: '', bio: '', avatar: '', banner: '', website: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  const [likedVideosList, setLikedVideosList] = useState([]);
  const [historyVideosList, setHistoryVideosList] = useState([]);
  const [savedVideosList, setSavedVideosList] = useState([]);
  const [uploadedVideosList, setUploadedVideosList] = useState([]);
  const [loadingTabData, setLoadingTabData] = useState(true);

  const activeTab = searchParams.get('tab') || 'uploads';

  const memoizedSetEditForm = useCallback(() => {
    if (currentUser) {
      setEditForm({ 
        name: currentUser.name || '', 
        username: currentUser.username || '', 
        bio: currentUser.bio || '',
        avatar: currentUser.avatar_url || '',
        banner: currentUser.banner_url || '',
        website: currentUser.website || '',
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loadingAuth && !currentUser) {
      toast({ title: "Access Denied", description: "Please login to view your profile.", variant: "destructive" });
      navigate('/');
    } else {
      memoizedSetEditForm();
    }
  }, [currentUser, loadingAuth, navigate, toast, memoizedSetEditForm]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser?.id) {
        setLoadingTabData(false);
        return;
      }
      
      setLoadingTabData(true);
      try {
        let data = [];
        if (activeTab === 'uploads') {
          data = await getVideos({ userId: currentUser.id });
          setUploadedVideosList(data.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)));
        } else if (activeTab === 'liked') {
          data = await getLikedVideos(currentUser.id);
          setLikedVideosList(data);
        } else if (activeTab === 'history') {
          data = await getHistoryVideos(currentUser.id);
          setHistoryVideosList(data);
        } else if (activeTab === 'saved') {
          data = await getSavedVideos(currentUser.id);
          setSavedVideosList(data);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} videos:`, error);
        toast({
          title: `Error loading ${activeTab}`,
          description: `Could not fetch your cosmic data. ${error.message}`,
          variant: "destructive"
        });
      } finally {
        setLoadingTabData(false);
      }
    };
    
    if (currentUser && currentUser.id && activeTab !== 'settings') {
      fetchProfileData();
    } else if (activeTab === 'settings') {
      setLoadingTabData(false); 
    } else if (!currentUser && !loadingAuth) {
      setLoadingTabData(false);
    }

  }, [currentUser, toast, activeTab, loadingAuth]);

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      if (fileType === 'avatar') setAvatarFile(file);
      if (fileType === 'banner') setBannerFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, [fileType]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsUpdatingProfile(true);
    setIsUploading(true);

    let finalAvatarUrl = editForm.avatar;
    let finalBannerUrl = editForm.banner;

    try {
      if (avatarFile) {
        const filePath = `profiles/${currentUser.id}/avatar-${Date.now()}.${avatarFile.name.split('.').pop()}`;
        const { publicUrl } = await uploadFile('thumbnails', filePath, avatarFile);
        finalAvatarUrl = publicUrl;
      }
      if (bannerFile) {
        const filePath = `profiles/${currentUser.id}/banner-${Date.now()}.${bannerFile.name.split('.').pop()}`;
        const { publicUrl } = await uploadFile('thumbnails', filePath, bannerFile);
        finalBannerUrl = publicUrl;
      }
    } catch (uploadError) {
      toast({ title: "File Upload Failed", description: uploadError.message, variant: "destructive" });
      setIsUploading(false);
      setIsUpdatingProfile(false);
      return;
    }
    setIsUploading(false);

    const profileDataToUpdate = {
      ...editForm,
      avatar: finalAvatarUrl,
      banner: finalBannerUrl,
    };
    
    const result = await updateUserProfile(profileDataToUpdate);
    setIsUpdatingProfile(false);
    if (!result.error) {
      setIsEditing(false);
      setAvatarFile(null); 
      setBannerFile(null);
      
    }
  };

  const renderVideoGrid = (videos, emptyMessage, emptyIcon = <Film className="h-16 w-16 mx-auto text-primary mb-4" />) => {
    if (loadingTabData) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden shimmer">
              <div className="aspect-video bg-secondary/30"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-secondary/30 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-secondary/30 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (!videos || videos.length === 0) {
      return (
        <div className="text-center py-12 glass-card rounded-lg">
          {emptyIcon}
          <h2 className="text-2xl font-semibold mb-2">Nothing Here Yet</h2>
          <p className="text-muted-foreground">{emptyMessage}</p>
          {emptyMessage.includes("uploaded") && <Button asChild className="mt-4 gradient-button hover:opacity-90 transition-opacity"><Link to="/upload">Upload Your First Video</Link></Button>}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>
    );
  };
  
  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  if (loadingAuth || !currentUser) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><Loader2 className="h-16 w-16 text-primary animate-spin" /></div>;
  }
  
  const bannerImage = currentUser.banner_url || `https://source.unsplash.com/1600x900/?${currentUser.username || 'space'},abstract,futuristic`;
  const avatarImage = currentUser.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${currentUser.email}`;


  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div 
        className="relative rounded-xl overflow-hidden shadow-2xl glassmorphic-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-56 md:h-72 bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        
        <div className="relative p-6 -mt-20 md:-mt-24 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <Avatar className="h-36 w-36 md:h-44 md:w-44 border-4 border-background bg-background shadow-lg">
            <AvatarImage src={avatarImage} alt={currentUser.name || currentUser.username} />
            <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{currentUser.name || currentUser.username}</h1>
            <p className="text-md text-muted-foreground">@{currentUser.username || currentUser.email?.split('@')[0]}</p>
            {currentUser.bio && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{currentUser.bio}</p>}
            {currentUser.website && <a href={currentUser.website.startsWith('http') ? currentUser.website : `https://${currentUser.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 justify-center sm:justify-start mt-1"><Link2 className="h-3 w-3"/>{currentUser.website}</a>}
          </div>

          <div className="flex items-center gap-4 sm:ml-auto">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{uploadedVideosList?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{currentUser.subscribers_count || 0}</p>
              <p className="text-xs text-muted-foreground">Subscribers</p>
            </div>
            <Button variant="outline" className="bg-card hover:bg-secondary border-border" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </motion.div>

      {isEditing && (
        <motion.div 
          className="bg-card p-6 rounded-xl shadow-xl border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Edit Your Cosmic Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">Display Name</Label>
                <Input id="name" name="name" value={editForm.name} onChange={handleEditFormChange} disabled={isUpdatingProfile} className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">Username</Label>
                <Input id="username" name="username" value={editForm.username} onChange={handleEditFormChange} disabled={isUpdatingProfile} className="mt-1"/>
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-muted-foreground">Bio</Label>
              <Textarea id="bio" name="bio" value={editForm.bio} onChange={handleEditFormChange} disabled={isUpdatingProfile} className="mt-1" placeholder="Tell the universe about yourself..."/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="avatar-upload" className="text-sm font-medium text-muted-foreground flex items-center gap-2"><ImageIcon className="h-4 w-4"/>Avatar Image</Label>
                <Input id="avatar-upload" name="avatarFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" disabled={isUpdatingProfile}/>
                {editForm.avatar && <img-replace src={editForm.avatar} alt="Avatar preview" class="mt-2 h-20 w-20 rounded-full object-cover" />}
              </div>
              <div>
                <Label htmlFor="banner-upload" className="text-sm font-medium text-muted-foreground flex items-center gap-2"><ImageIcon className="h-4 w-4"/>Banner Image</Label>
                <Input id="banner-upload" name="bannerFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" disabled={isUpdatingProfile}/>
                {editForm.banner && <img-replace src={editForm.banner} alt="Banner preview" class="mt-2 h-20 w-full rounded-md object-cover" />}
              </div>
            </div>
             <div>
              <Label htmlFor="website" className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Link2 className="h-4 w-4"/>Website URL</Label>
              <Input id="website" name="website" type="url" value={editForm.website} onChange={handleEditFormChange} placeholder="https://your.cosmic.site" disabled={isUpdatingProfile} className="mt-1"/>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); memoizedSetEditForm(); setAvatarFile(null); setBannerFile(null); }} disabled={isUpdatingProfile || isUploading}>Cancel</Button>
              <Button type="submit" disabled={isUpdatingProfile || isUploading} className="gradient-button hover:opacity-90 transition-opacity">
                {(isUpdatingProfile || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4 mr-2"/>Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-card border border-border rounded-lg">
          <TabsTrigger value="uploads" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><UploadCloud className="h-4 w-4" /> Uploads</TabsTrigger>
          <TabsTrigger value="liked" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ThumbsUp className="h-4 w-4" /> Liked</TabsTrigger>
          <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><History className="h-4 w-4" /> History</TabsTrigger>
          <TabsTrigger value="saved" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Bookmark className="h-4 w-4" /> Saved</TabsTrigger>
          <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Settings className="h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="uploads" className="mt-6">
          {renderVideoGrid(uploadedVideosList, "You haven't uploaded any videos from this dimension yet. Time to share your cosmic creations!")}
        </TabsContent>
        <TabsContent value="liked" className="mt-6">
          {renderVideoGrid(likedVideosList, "No liked videos found in your star logs. Explore and find some gems!")}
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          {renderVideoGrid(historyVideosList, "Your viewing history is like a clean slate in a new galaxy. Start exploring!")}
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          {renderVideoGrid(savedVideosList, "No saved videos in your collection. Find some cosmic content to bookmark!")}
        </TabsContent>
        <TabsContent value="settings" className="mt-6 p-6 bg-card rounded-lg shadow-md border border-border">
          <h2 className="text-xl font-semibold mb-6 gradient-text">Account Settings</h2>
          <div className="space-y-4">
            <p><strong className="text-muted-foreground">Email:</strong> {currentUser.email}</p>
            <p><strong className="text-muted-foreground">User ID:</strong> {currentUser.id}</p>
            <p><strong className="text-muted-foreground">Joined:</strong> {new Date(currentUser.created_at).toLocaleDateString()}</p>
             <p><strong className="text-muted-foreground">Role:</strong> <span className={`font-semibold ${currentUser.role === 'admin' ? 'text-primary' : 'text-foreground'}`}>{currentUser.role}</span></p>
            <Button variant="outline" onClick={() => toast({title: "Coming Soon!", description: "Password change functionality is warping in from another dimension."})}>Change Password</Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">More settings coming soon from other dimensions!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;