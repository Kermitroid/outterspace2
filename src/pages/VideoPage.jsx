import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import RelatedVideos from '@/components/RelatedVideos';
import CommentSection from '@/components/CommentSection';
import { getVideoById, addVideoToHistory, toggleLikeVideo, toggleSaveVideo, isVideoLiked, isVideoSaved } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ThumbsUp, Bookmark, Share2, Flag, User, Eye, CalendarDays, Tag, Loader2, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [isLoadingInteraction, setIsLoadingInteraction] = useState(false);

  const { currentUser } = useAuth();
  const { toast } = useToast();

  const fetchVideoData = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedVideo = await getVideoById(id);
      if (fetchedVideo) {
        setVideo(fetchedVideo);
        setCurrentLikes(fetchedVideo.likes_count || 0);
        if (currentUser) {
          addVideoToHistory(currentUser.id, fetchedVideo.id);
          const likedStatus = await isVideoLiked(currentUser.id, fetchedVideo.id);
          setIsLiked(likedStatus);
          const savedStatus = await isVideoSaved(currentUser.id, fetchedVideo.id);
          setIsSaved(savedStatus);
        }
      } else {
        toast({ title: "Video Not Found", description: "This cosmic transmission seems to be lost in space.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      toast({ title: "Error Loading Video", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [id, currentUser, toast]);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  const handleLike = async () => {
    if (!currentUser || !video) {
      toast({ title: "Login Required", description: "Please log in to like videos.", variant: "destructive" });
      return;
    }
    setIsLoadingInteraction(true);
    try {
      const liked = await toggleLikeVideo(currentUser.id, video.id);
      setIsLiked(liked);
      setCurrentLikes(prev => liked ? prev + 1 : (prev > 0 ? prev - 1 : 0));
      toast({ title: liked ? "Video Liked!" : "Like Removed", duration: 2000 });
    } catch (error) {
      toast({ title: "Error Liking Video", description: error.message, variant: "destructive" });
    } finally {
      setIsLoadingInteraction(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser || !video) {
      toast({ title: "Login Required", description: "Please log in to save videos.", variant: "destructive" });
      return;
    }
    setIsLoadingInteraction(true);
    try {
      const saved = await toggleSaveVideo(currentUser.id, video.id);
      setIsSaved(saved);
      toast({ title: saved ? "Video Saved!" : "Removed from Saved", duration: 2000 });
    } catch (error) {
      toast({ title: "Error Saving Video", description: error.message, variant: "destructive" });
    } finally {
      setIsLoadingInteraction(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link Copied!", description: "Video link copied to your clipboard." });
  };
  
  const handleReport = () => {
    toast({ title: "Report Submitted", description: "Thank you for helping keep our galaxy safe. (Feature coming soon!)" });
  };


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Film className="h-32 w-32 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">Video Not Found</h1>
        <p className="text-muted-foreground mt-2">This cosmic transmission seems to be lost in space or time.</p>
        <Button asChild className="mt-6 gradient-button">
          <Link to="/">Return to Holo-Deck</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div 
          className="lg:w-2/3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <VideoPlayer src={video.video_url || video.videoUrl} poster={video.thumbnail_url || video.thumbnailUrl} />
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Eye className="h-4 w-4"/> {video.views_count != null ? video.views_count.toLocaleString() : 0} views</span>
                <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4"/> {video.uploadedAt || new Date(video.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={handleLike} disabled={isLoadingInteraction} className="gap-1.5">
                  {isLoadingInteraction && isLiked ? <Loader2 className="h-4 w-4 animate-spin"/> : <ThumbsUp className="h-4 w-4" />} {currentLikes != null ? currentLikes.toLocaleString() : 0}
                </Button>
                <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={handleSave} disabled={isLoadingInteraction} className="gap-1.5">
                  {isLoadingInteraction && isSaved ? <Loader2 className="h-4 w-4 animate-spin"/> : <Bookmark className="h-4 w-4" />} Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5"><Share2 className="h-4 w-4"/> Share</Button>
                <Button variant="outline" size="sm" onClick={handleReport} className="gap-1.5"><Flag className="h-4 w-4"/> Report</Button>
              </div>
            </div>

            <div className="py-4 border-y border-border/50">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${video.profile?.id || video.channel?.id}`} className="flex-shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={video.channel?.avatar || video.profile?.avatar_url} alt={video.channel?.name || video.profile?.name} />
                    <AvatarFallback><User className="h-6 w-6"/></AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <Link to={`/profile/${video.profile?.id || video.channel?.id}`}>
                    <h2 className="font-semibold text-foreground hover:text-primary transition-colors">{video.channel?.name || video.profile?.name || 'Unknown Creator'}</h2>
                  </Link>
                  <p className="text-xs text-muted-foreground">{video.channel?.subscribers || video.profile?.subscribers_count || 0} subscribers</p>
                </div>
                <Button variant="default" className="gradient-button">Subscribe</Button>
              </div>
            </div>
            
            {video.description && (
              <div className="mt-4 prose prose-sm dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap">
                <h3 className="font-semibold text-lg mb-2">Description:</h3>
                <p>{video.description}</p>
              </div>
            )}
            {video.tags && video.tags.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-md mb-2 text-muted-foreground">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag, index) => (
                            <Link key={index} to={`/search?q=${encodeURIComponent(tag)}`} className="px-3 py-1 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground text-xs rounded-full transition-colors">
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>
          
          <CommentSection videoId={video.id} />
        </motion.div>

        <motion.div 
          className="lg:w-1/3 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RelatedVideos currentVideoId={video.id} categoryName={video.category?.name || video.category} />
        </motion.div>
      </div>
    </div>
  );
};

export default VideoPage;