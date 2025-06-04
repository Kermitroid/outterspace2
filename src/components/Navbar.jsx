import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clapperboard, Search, Upload, User, LogOut, Settings, PlusCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };
  
  const isAdmin = currentUser && currentUser.role === 'admin';


  return (
    <>
      <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Clapperboard className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">BackFromOutterSpace</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-grow max-w-md">
            <Input
              type="search"
              placeholder="Search the cosmos..."
              className="search-bar flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/search')}>
              <Search className="h-5 w-5" />
            </Button>
            
            {currentUser ? (
              <>
                <Link to="/upload">
                  <Button variant="ghost" size="icon" aria-label="Upload video">
                    <Upload className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="relative">
                  <Button variant="ghost" size="icon" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} aria-label="User menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${currentUser.email}`} alt={currentUser.name || currentUser.username} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  </Button>
                  {isUserMenuOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">{currentUser.name || currentUser.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                        {isAdmin && <p className="text-xs text-primary font-semibold mt-1">Admin Access</p>}
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary" onClick={() => setIsUserMenuOpen(false)}>
                        <User className="h-4 w-4" /> Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/manage-aggregated" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary" onClick={() => setIsUserMenuOpen(false)}>
                          <ShieldCheck className="h-4 w-4 text-primary" /> Admin: Manage Sources
                        </Link>
                      )}
                      <Link to="/profile?tab=settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary" onClick={() => setIsUserMenuOpen(false)}>
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary text-destructive">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsLoginModalOpen(true)}>Login</Button>
                <Button size="sm" onClick={() => setIsSignupModalOpen(true)}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} onSwitchToSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); }} />
      <SignupModal isOpen={isSignupModalOpen} onOpenChange={setIsSignupModalOpen} onSwitchToLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true); }} />
    </>
  );
};

export default Navbar;
