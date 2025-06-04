import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Flag,
  User,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { addComment as apiAddComment, getComments as apiGetComments } from '@/lib/api';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;
      setIsLoadingComments(true);
      try {
        const fetchedComments = await apiGetComments(videoId);
        setComments(fetchedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        toast({
          title: "Error loading comments",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoadingComments(false);
      }
    };
    fetchComments();
  }, [videoId, toast]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast({ title: "Login required", description: "Please log in to post a comment.", variant: "destructive" });
      return;
    }
    if (!newComment.trim()) return;
    
    setIsSubmittingComment(true);
    try {
      const addedComment = await apiAddComment(videoId, newComment.trim(), currentUser.id);
      setComments(prevComments => [addedComment, ...prevComments]);
      setNewComment('');
      toast({ title: "Comment posted!", description: "Your cosmic wisdom has been shared." });
    } catch (error) {
      toast({ title: "Failed to post comment", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLikeComment = (commentId) => {
    if (!currentUser) {
      toast({ title: "Login required", description: "Please log in to like comments.", variant: "destructive" });
      return;
    }
    // Placeholder for actual like functionality via API
    console.log("Liking comment (placeholder):", commentId);
    toast({ title: "Interaction noted!", description: "Liking comments coming soon!" });
  };

  const handleDislikeComment = (commentId) => {
    if (!currentUser) {
      toast({ title: "Login required", description: "Please log in to dislike comments.", variant: "destructive" });
      return;
    }
    // Placeholder
    console.log("Disliking comment (placeholder):", commentId);
    toast({ title: "Interaction noted!", description: "Disliking comments coming soon!" });
  };

  const handleReportComment = (commentId) => {
    // Placeholder
    console.log("Reporting comment (placeholder):", commentId);
    toast({ title: "Comment reported", description: "Thank you for helping keep our galaxy safe." });
  };

  if (isLoadingComments) {
    return (
      <div className="mt-6 space-y-4">
        <div className="h-10 bg-secondary/30 rounded w-1/4 shimmer"></div>
        <div className="flex gap-3 items-start p-4 border border-border/30 rounded-lg shimmer">
            <div className="h-10 w-10 rounded-full bg-secondary/50"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary/50 rounded w-1/3"></div>
                <div className="h-3 bg-secondary/50 rounded w-full"></div>
                <div className="h-3 bg-secondary/50 rounded w-2/3"></div>
            </div>
        </div>
         <div className="flex gap-3 items-start p-4 border border-border/30 rounded-lg shimmer">
            <div className="h-10 w-10 rounded-full bg-secondary/50"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary/50 rounded w-1/3"></div>
                <div className="h-3 bg-secondary/50 rounded w-full"></div>
                <div className="h-3 bg-secondary/50 rounded w-2/3"></div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-border/30">
      <h3 className="text-xl font-semibold mb-6 text-foreground">{comments.length} Cosmic Commentaries</h3>
      
      {currentUser && (
        <div className="mb-8 p-4 bg-card border border-border/50 rounded-lg shadow-sm">
          <form onSubmit={handleSubmitComment} className="flex flex-col sm:flex-row gap-4 items-start">
            <Avatar className="h-10 w-10 flex-shrink-0 mt-1 hidden sm:block">
              <AvatarImage src={currentUser.avatar_url} alt={currentUser.name || currentUser.username} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                className="w-full bg-input border-border rounded-md p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
                placeholder="Share your cosmic thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSubmittingComment}
              />
              <div className="flex justify-end mt-3 gap-2">
                <Button type="button" variant="ghost" onClick={() => setNewComment('')} disabled={isSubmittingComment || !newComment.trim()}>
                  Clear
                </Button>
                <Button type="submit" disabled={isSubmittingComment || !newComment.trim()}>
                  {isSubmittingComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Post Comment
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!currentUser && (
         <div className="mb-8 p-4 bg-card border border-border/50 rounded-lg shadow-sm text-center">
            <p className="text-muted-foreground">Please <Button variant="link" className="p-0 h-auto" onClick={() => document.querySelector('nav button[aria-label="User menu"]')?.click() || document.querySelector('nav button:first-of-type')?.click()}>log in</Button> to join the conversation.</p>
        </div>
      )}
      
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div 
            key={comment.id}
            className="flex gap-4 p-4 bg-card border border-border/50 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Avatar className="h-10 w-10 flex-shrink-0 mt-1">
              <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">{comment.user?.name || 'Anonymous Voyager'}</span>
                <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleString()}</span>
              </div>
              
              <p className="text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
              
              <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:text-primary" onClick={() => handleLikeComment(comment.id)}>
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-xs">{comment.likes_count || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:text-destructive" onClick={() => handleDislikeComment(comment.id)}>
                  <ThumbsDown className="h-4 w-4" />
                  <span className="text-xs">{comment.dislikes_count || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:text-accent-foreground" onClick={() => toast({ title: "Reply Feature", description: "Replying to comments is coming soon!", duration: 3000 })}>
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">Reply</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto hover:text-destructive" onClick={() => handleReportComment(comment.id)}>
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
        {comments.length === 0 && !isLoadingComments && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;