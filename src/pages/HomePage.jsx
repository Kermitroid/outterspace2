
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import CategoryPills from '@/components/CategoryPills';
import { ChevronRight, Film, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getVideos } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const HomePage = () => {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [latestVideos, setLatestVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth(); // Get current user

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const videos = await getVideos();
        
        // For featured, pick one if available, otherwise empty
        const potentialFeatured = videos.filter(video => video.featured);
        setFeaturedVideos(potentialFeatured.length > 0 ? [potentialFeatured[0]] : []);

        // For trending, pick up to 8
        setTrendingVideos(videos.filter(video => video.trending).slice(0, 8));
        
        // Sort all videos by date for "Latest"
        const sortedByDate = [...videos].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });
        setLatestVideos(sortedByDate.slice(0, 12));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        toast({
          title: "Error loading videos",
          description: "Could not fetch videos. The space anomaly might be interfering.",
          variant: "destructive",
          duration: 5000,
        });
        setLoading(false);
      }
    };

    fetchVideos();
  }, [toast]);

  const renderSkeleton = (count, featured = false) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div 
          key={index} 
          className={`rounded-lg overflow-hidden shimmer ${
            featured ? 'col-span-full lg:col-span-2' : ''
          }`}
        >
          <div className="aspect-video bg-secondary/30"></div>
          <div className="p-3 space-y-2">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary/30"></div>
              <div className="flex-1">
                <div className="h-4 bg-secondary/30 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-secondary/30 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ));
  };

  const renderVideoSection = (title, videos, linkTo, showViewAll = true) => {
    if (loading) {
      return (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {showViewAll && linkTo && (
              <Link to={linkTo}>
                <Button variant="ghost" className="gap-1">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${title === 'Featured' ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6`}>
            {renderSkeleton(title === 'Featured' && videos.length > 0 ? 1 : (title === 'Featured' ? 0 : 4), title === 'Featured')}
          </div>
        </section>
      );
    }

    // Only render section if videos exist, or if it's not a "Featured" section (which can be empty)
    if (videos.length === 0 && title !== 'Featured') { 
      return (
         <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
             {showViewAll && linkTo && (
              <Link to={linkTo}>
                <Button variant="ghost" className="gap-1">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          <div className="text-center py-8 glass-card rounded-lg">
            <Film className="h-12 w-12 mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">No {title.toLowerCase()} videos beamed in yet. Check back soon or explore other galaxies!</p>
          </div>
        </section>
      );
    }
    
    if (videos.length === 0 && title === 'Featured') return null; // Don't render featured section if empty

    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showViewAll && linkTo && (
            <Link to={linkTo}>
              <Button variant="ghost" className="gap-1">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${title === 'Featured' ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6`}>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * (title === 'Featured' ? 0 : 0.05) }} // Faster delay for non-featured
            >
              <VideoCard video={video} featured={title === 'Featured'} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };


  return (
    <div className="space-y-8">
      <CategoryPills />
      
      {renderVideoSection('Featured', featuredVideos, null, false)}
      {renderVideoSection('Trending', trendingVideos, '/categories?category=trending-now')}
      {renderVideoSection('Latest Videos', latestVideos, '/categories?category=new-releases')}

      { !loading && featuredVideos.length === 0 && trendingVideos.length === 0 && latestVideos.length === 0 && (
         <div className="text-center py-16 glass-card rounded-lg">
            <Film className="h-24 w-24 mx-auto text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-4 gradient-text">Welcome to BackFromOutterSpace!</h2>
            <p className="text-muted-foreground text-lg mb-6">
              It looks like the cosmic void is a bit empty... Be the first to transmit your video signal!
            </p>
            <Button size="lg" asChild>
              <Link to={currentUser ? "/upload" : "#"} onClick={() => !currentUser && toast({ title: "Login Required", description: "Please log in to upload your first video.", variant: "destructive"})}>
                <Upload className="mr-2 h-5 w-5" /> Transmit Your First Video
              </Link>
            </Button>
          </div>
      )}
    </div>
  );
};

export default HomePage;
