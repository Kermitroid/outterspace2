import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { addVideo, getCategories as fetchCategories, uploadFile } from '@/lib/api';
import { UploadCloud, Loader2, Film, Image as ImageIcon, Tag, ListVideo, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [publishNow, setPublishNow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Files, 3: Review

  const { currentUser, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loadingAuth && !currentUser) {
      toast({
        title: 'Authentication Required',
        description: 'You need to be logged in to upload videos.',
        variant: 'destructive',
      });
      navigate('/');
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
    loadCategories();
  }, [toast]);

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !videoFile || !thumbnailFile) {
      toast({ title: 'Missing Fields', description: 'Please fill all required fields and select files.', variant: 'destructive' });
      return;
    }
    if (!currentUser) {
      toast({ title: 'Not Authenticated', description: 'Please log in again.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      
      setUploadProgress(10);
      const thumbnailPath = `thumbnails/${currentUser.id}/${Date.now()}_${thumbnailFile.name}`;
      const { publicUrl: thumbnailUrl } = await uploadFile('thumbnails', thumbnailPath, thumbnailFile);
      setUploadProgress(40);

      
      const videoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"; 
      const storagePath = null; 
      setUploadProgress(70);


      
      const videoData = {
        title,
        description,
        category,
        tags,
        videoUrl, 
        thumbnailUrl,
        durationSeconds: 0, 
        publishNow,
        storagePath, 
      };

      await addVideo(videoData, currentUser.id);
      setUploadProgress(100);
      toast({ title: 'Video Uploaded!', description: 'Your cosmic transmission is live!' });
      navigate(`/profile?tab=uploads`);

    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: 'Upload Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (loadingAuth) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-16 w-16 text-primary animate-spin" /></div>;
  }
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: 
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-lg font-medium flex items-center gap-2"><Film className="h-5 w-5 text-primary"/>Video Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Space Adventure" className="mt-2 text-base p-3" required />
            </div>
            <div>
              <Label htmlFor="description" className="text-lg font-medium">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief summary of your cosmic journey..." className="mt-2 min-h-[120px] text-base p-3" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="text-lg font-medium flex items-center gap-2"><ListVideo className="h-5 w-5 text-primary"/>Category</Label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-3 border border-border rounded-md bg-input text-base focus:ring-2 focus:ring-primary" required>
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="tags" className="text-lg font-medium flex items-center gap-2"><Tag className="h-5 w-5 text-primary"/>Tags (comma-separated)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="space, aliens, exploration" className="mt-2 text-base p-3" />
              </div>
            </div>
          </motion.div>
        );
      case 2: 
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
              <Label htmlFor="videoFile" className="text-lg font-medium flex items-center gap-2 cursor-pointer"><UploadCloud className="h-6 w-6 text-primary"/>Upload Video File</Label>
              <Input id="videoFile" type="file" accept="video/*" onChange={handleVideoFileChange} className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" required />
              {videoPreview && <video src={videoPreview} controls className="mt-4 rounded-md max-h-60 w-full object-contain bg-black"></video>}
            </div>
            <div className="p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
              <Label htmlFor="thumbnailFile" className="text-lg font-medium flex items-center gap-2 cursor-pointer"><ImageIcon className="h-6 w-6 text-primary"/>Upload Thumbnail Image</Label>
              <Input id="thumbnailFile" type="file" accept="image/*" onChange={handleThumbnailFileChange} className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" required />
              {thumbnailPreview && <img-replace src={thumbnailPreview} alt="Thumbnail Preview" class="mt-4 rounded-md max-h-60 w-full object-contain bg-muted" />}
            </div>
          </motion.div>
        );
      case 3: 
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-2xl font-semibold gradient-text">Review Your Transmission</h3>
            <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Description:</strong> {description.substring(0,100)}{description.length > 100 && "..."}</p>
              <p><strong>Tags:</strong> {tags}</p>
              {thumbnailPreview && <img-replace src={thumbnailPreview} alt="Thumbnail" class="w-1/2 rounded-md mx-auto" />}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="publishNow" checked={publishNow} onCheckedChange={setPublishNow} />
              <Label htmlFor="publishNow" className="text-base">Publish Immediately</Label>
            </div>
            {isLoading && (
              <div className="w-full bg-muted rounded-full h-2.5 mt-4">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                <p className="text-sm text-center mt-1">{uploadProgress}% uploaded</p>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-12 max-w-3xl"
    >
      <div className="bg-card p-8 rounded-xl shadow-2xl border border-border">
        <div className="text-center mb-8">
          <UploadCloud className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold gradient-text">Upload Your Cosmic Video</h1>
          <p className="text-muted-foreground mt-2">Share your adventures from across the universe!</p>
        </div>

        
        <div className="flex justify-between items-center mb-8">
            {['Details', 'Files', 'Review'].map((stepName, index) => (
                <React.Fragment key={stepName}>
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep > index + 1 ? 'bg-green-500 border-green-500 text-white' : currentStep === index + 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-muted'}`}>
                            {currentStep > index + 1 ? <CheckCircle className="h-5 w-5"/> : index + 1}
                        </div>
                        <p className={`mt-1 text-sm font-medium ${currentStep >= index + 1 ? 'text-primary' : 'text-muted-foreground'}`}>{stepName}</p>
                    </div>
                    {index < 2 && <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-border'}`}></div>}
                </React.Fragment>
            ))}
        </div>


        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStepContent()}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isLoading}>
              Previous
            </Button>
            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} disabled={isLoading}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !videoFile || !thumbnailFile} className="gradient-button hover:opacity-90 transition-opacity">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                {isLoading ? `Uploading ${uploadProgress}%` : 'Upload & Publish'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UploadPage;