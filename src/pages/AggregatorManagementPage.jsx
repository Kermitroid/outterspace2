import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { addVideo as apiAddVideo, getCategories as fetchCategories } from '@/lib/api';
import { PlusCircle, Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AggregatorManagementPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [originalSourceLink, setOriginalSourceLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { currentUser, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loadingAuth) {
      if (!currentUser) {
        toast({ title: 'Access Denied', description: 'You must be logged in to access this page.', variant: 'destructive'});
        navigate('/login');
      } else if (currentUser.role !== 'admin') {
        toast({ title: 'Access Denied', description: 'You do not have permission to access this page.', variant: 'destructive'});
        navigate('/');
      }
    }
  }, [currentUser, loadingAuth, navigate, toast]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetched = await fetchCategories();
        setCategories(fetched.filter(cat => cat.name !== 'All')); 
      } catch (error) {
        toast({ title: 'Error loading categories', description: error.message, variant: 'destructive' });
      }
    };
    if (currentUser?.role === 'admin') {
      loadCategories();
    }
  }, [toast, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !videoUrl || !category || !sourceName) {
      toast({ title: 'Missing Fields', description: 'Please fill title, video URL, category, and source name.', variant: 'destructive' });
      return;
    }
    if (!currentUser) {
      toast({ title: 'Not Authenticated', description: 'Please log in again.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const videoData = {
        title,
        description,
        videoUrl,
        thumbnailUrl: thumbnailUrl || `https://source.unsplash.com/640x360/?${encodeURIComponent(title)}`, // Default thumbnail
        category,
        tags,
        durationSeconds: 0, // Aggregated videos might not have this readily
        publishNow: true,
        sourceType: 'aggregated',
        originalSourceLink: originalSourceLink || sourceName, // Use source name if specific link not provided
      };
      await apiAddVideo(videoData, currentUser.id);
      toast({ title: 'Aggregated Video Added!', description: `${title} is now part of the cosmic library.` });
      // Reset form
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setCategory('');
      setTags('');
      setSourceName('');
      setOriginalSourceLink('');
    } catch (error) {
      toast({ title: 'Failed to Add Video', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingAuth) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-16 w-16 text-primary animate-spin" /></div>;
  }

  if (currentUser?.role !== 'admin') {
    return (
       <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <ShieldAlert className="h-24 w-24 mx-auto text-destructive mb-6" />
        <h1 className="text-4xl font-bold text-destructive mb-4">Access Denied</h1>
        <p className="text-xl text-muted-foreground mb-8">You do not have the cosmic clearance for this administrative zone.</p>
        <Button onClick={() => navigate('/')} className="gradient-button">Return to Safety</Button>
      </div>
    );
  }


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-12 max-w-3xl"
    >
      <div className="bg-card p-8 rounded-xl shadow-2xl border border-border">
        <div className="text-center mb-8">
          <PlusCircle className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold gradient-text">Manage Aggregated Content</h1>
          <p className="text-muted-foreground mt-2">Add videos from external public domain / open source platforms.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-lg font-medium">Video Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the external video" className="mt-2 text-base p-3" required />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-medium">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description" className="mt-2 min-h-[100px] text-base p-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="videoUrl" className="text-lg font-medium">Video URL (Direct MP4 or Embeddable)</Label>
              <Input id="videoUrl" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://example.com/video.mp4" className="mt-2 text-base p-3" required />
            </div>
            <div>
              <Label htmlFor="thumbnailUrl" className="text-lg font-medium">Thumbnail URL (Optional)</Label>
              <Input id="thumbnailUrl" type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="https://example.com/thumbnail.jpg" className="mt-2 text-base p-3" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category" className="text-lg font-medium">Category</Label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-3 border border-border rounded-md bg-input text-base focus:ring-2 focus:ring-primary" required>
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="tags" className="text-lg font-medium">Tags (comma-separated)</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, public domain" className="mt-2 text-base p-3" />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="sourceName" className="text-lg font-medium">Source Name</Label>
              <Input id="sourceName" value={sourceName} onChange={(e) => setSourceName(e.target.value)} placeholder="e.g., Archive.org, Pexels Videos" className="mt-2 text-base p-3" required />
            </div>
            <div>
              <Label htmlFor="originalSourceLink" className="text-lg font-medium">Original Source Link (Optional)</Label>
              <Input id="originalSourceLink" type="url" value={originalSourceLink} onChange={(e) => setOriginalSourceLink(e.target.value)} placeholder="Link to original video page" className="mt-2 text-base p-3" />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t border-border">
            <Button type="submit" disabled={isLoading} className="gradient-button hover:opacity-90 transition-opacity min-w-[150px]">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {isLoading ? 'Adding...' : 'Add Video Source'}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AggregatorManagementPage;