import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  ThumbsUp, 
  Bookmark,
  User,
  Eye,
  Loader2,
  Film 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { toggleLikeVideo, toggleSaveVideo, isVideoLiked, isVideoSaved } from '@/lib/api';

const VideoCard = ({ video, featured = false }) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const [isLikedState, setIsLikedState] = React.useState(false);
  const [isSavedState, setIsSavedState] = React.useState(false);
  const [isLoadingLike, setIsLoadingLike] = React.useState(false);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [currentLikes, setCurrentLikes] = React.useState(video?.likes || 0);

  React.useEffect(() => {
    setCurrentLikes(video?.likes || 0); 
    const checkStatus = async () => {
      if (currentUser && video?.id) {
        try {
          setIsLoadingLike(true);
          setIsLoadingSave(true);
          const liked = await isVideoLiked(currentUser.id, video.id);
          setIsLikedState(liked);
          const saved = await isVideoSaved(currentUser.id, video.id);
          setIsSavedState(saved);
        } catch (error) {
          console.error("Error checking video status:", error);
        } finally {
          setIsLoadingLike(false);
          setIsLoadingSave(false);
        }
      }
    };
    checkStatus();
  }, [currentUser, video?.id, video?.likes]);


  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser || !video?.id) {
      toast({ title: "Login Required", description: "Please log in to like videos.", variant: "destructive" });
      return;
    }
    setIsLoadingLike(true);
    try {
      const liked = await toggleLikeVideo(currentUser.id, video.id);
      setIsLikedState(liked);
      setCurrentLikes(prev => liked ? prev + 1 : prev -1);
      toast({ title: liked ? "Video Liked!" : "Like Removed", description: "Cosmic appreciation noted!", duration: 2000 });
    } catch (error) {
      toast({ title: "Error Liking Video", description: error.message, variant: "destructive" });
    } finally {
      setIsLoadingLike(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser || !video?.id) {
      toast({ title: "Login Required", description: "Please log in to save videos.", variant: "destructive" });
      return;
    }
    setIsLoadingSave(true);
    try {
      const saved = await toggleSaveVideo(currentUser.id, video.id);
      setIsSavedState(saved);
      toast({ title: saved ? "Video Saved!" : "Removed from Saved", description: "Added to your star charts.", duration: 2000 });
    } catch (error) {
      toast({ title: "Error Saving Video", description: error.message, variant: "destructive" });
    } finally {
      setIsLoadingSave(false);
    }
  };
  
  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
     if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to add to watch later.", variant: "destructive" });
      return;
    }
    toast({ title: "Watch Later", description: "Queued for your next space voyage. (Feature coming soon!)", duration: 3000 });
  };

  if (!video) {
    return (
      <div className={`video-card rounded-lg overflow-hidden ${featured ? 'glass-card' : 'bg-secondary/30'} shimmer`}>
        <div className="aspect-video bg-muted/50 rounded-t-lg"></div>
        <div className="p-3 space-y-2">
          <div className="h-5 bg-muted/50 rounded w-3/4"></div>
          <div className="h-4 bg-muted/50 rounded w-1/2"></div>
          <div className="h-3 bg-muted/50 rounded w-1/3"></div>
        </div>
      </div>
    );
  }
  
  const thumbnailUrl = video.thumbnail_url || video.thumbnailUrl || ''; 
  const channelAvatar = video.channel?.avatar || '';


  return (
    <motion.div 
      className={`video-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${featured ? 'glass-card border border-primary/30' : 'bg-card hover:shadow-primary/20'}`}
      whileHover={{ scale: featured ? 1 : 1.03, y: featured? 0 : -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link to={`/video/${video.id}`} className="block group">
        <div className="relative aspect-video overflow-hidden">
          {thumbnailUrl ? (
            <img-replace
              class="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300 ease-in-out" 
              alt={`Thumbnail for ${video.title}`}
              src={thumbnailUrl} />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
              <Film className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
          
          {video.duration && <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{video.duration}</div>}
          
          {featured && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              FEATURED
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex gap-3 items-start">
            <Avatar className="h-10 w-10 flex-shrink-0 border-2 border-transparent group-hover:border-primary transition-all">
              <AvatarImage src={channelAvatar} alt={video.channel?.name || 'Channel'} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">{video.title || 'Untitled Video'}</h3>
              <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors">{video.channel?.name || 'Unknown Channel'}</p>
              
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {video.views != null ? video.views.toLocaleString() : 0}
                </span>
                <span>•</span>
                <span>{video.uploadedAt || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {featured && video.description && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{video.description}</p>
          )}
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/50">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 gap-1.5 ${isLikedState ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'}`} 
              onClick={handleLike}
              disabled={isLoadingLike}
            >
              {isLoadingLike ? <Loader2 className="h-4 w-4 animate-spin" /> : <ThumbsUp className="h-4 w-4" />}
              <span className="text-xs font-medium">{currentLikes != null ? currentLikes.toLocaleString() : 0}</span>
            </Button>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${isSavedState ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'}`} 
                onClick={handleSave}
                disabled={isLoadingSave}
                aria-label="Save video"
              >
                {isLoadingSave ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={handleWatchLater} aria-label="Watch later">
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;