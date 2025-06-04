
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '@/components/VideoCard';
import CategoryPills from '@/components/CategoryPills';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getVideos } from '@/lib/api';
import { Filter, ChevronDown, ChevronUp, Film } from 'lucide-react';

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [sortBy, setSortBy] = useState('createdAt'); 
  const { toast } = useToast();
  
  const activeCategoryParam = searchParams.get('category') || 'All'; // Default to All if no param
  const currentSortParam = searchParams.get('sort') || 'latest'; // Default sort

  useEffect(() => {
    if (currentSortParam === 'latest') {
      setSortBy('createdAt');
      setSortOrder('desc');
    } else if (currentSortParam === 'popular') { 
      setSortBy('views');
      setSortOrder('desc');
    }
  }, [currentSortParam]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const allVideos = await getVideos();
        setVideos(allVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        toast({
          title: "Error loading videos",
          description: "Could not fetch videos for this category.",
          variant: "destructive",
          duration: 5000,
        });
        setLoading(false);
      }
    };

    fetchVideos();
  }, [toast]);
  
  useEffect(() => {
    let result = [...videos];
    
    if (activeCategoryParam && activeCategoryParam.toLowerCase() !== 'all') {
      result = result.filter(video => video.category?.toLowerCase().replace(/\s+/g, '-') === activeCategoryParam.toLowerCase());
    }
    
    result.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'createdAt') {
        valA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        valB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      } else if (sortBy === 'views') {
        valA = parseInt(String(a.views).replace(/[^0-9]/g, '')) || 0;
        valB = parseInt(String(b.views).replace(/[^0-9]/g, '')) || 0;
      } else if (sortBy === 'likes') {
        valA = parseInt(String(a.likes).replace(/[^0-9]/g, '')) || 0;
        valB = parseInt(String(b.likes).replace(/[^0-9]/g, '')) || 0;
      } else { // Default to no sort if sortBy is unknown
        return 0;
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
    
    setFilteredVideos(result);
  }, [videos, activeCategoryParam, sortBy, sortOrder]);

  const handleSortChange = (newSortBy) => {
    let newSortParam = '';
    if (newSortBy === 'createdAt') newSortParam = 'latest';
    else if (newSortBy === 'views') newSortParam = 'popular';

    if (sortBy === newSortBy) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      setSearchParams({ category: activeCategoryParam, sort: newSortParam });
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc'); 
      setSearchParams({ category: activeCategoryParam, sort: newSortParam });
    }
  };

  const pageTitle = activeCategoryParam && activeCategoryParam.toLowerCase() !== 'all'
    ? `${activeCategoryParam.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Videos`
    : 'All Videos';


  const renderSkeleton = (count) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden shimmer">
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

  return (
    <div className="space-y-6">
      <CategoryPills activeCategory={activeCategoryParam} />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold gradient-text">{pageTitle}</h1>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button 
            variant={sortBy === 'createdAt' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleSortChange('createdAt')}
          >
            Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
          </Button>
          <Button 
            variant={sortBy === 'views' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleSortChange('views')}
          >
            Views {sortBy === 'views' && (sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
          </Button>
          <Button 
            variant={sortBy === 'likes' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => handleSortChange('likes')}
          >
            Likes {sortBy === 'likes' && (sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeleton(8)}
        </div>
      ) : filteredVideos.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 glass-card rounded-lg">
          <Film className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Videos Transmitted Yet</h2>
          <p className="text-muted-foreground">
            There are no videos in this category yet. Try exploring another part of the cosmos or upload your own signal!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
