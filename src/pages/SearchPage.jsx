
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import VideoCard from '@/components/VideoCard';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getVideos } from '@/lib/api';
import { SearchX, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input for search bar on page

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const initialQuery = searchParams.get('q') || '';
  const [pageQuery, setPageQuery] = useState(initialQuery); // For the input field on this page

  useEffect(() => {
    // Update pageQuery if the URL q parameter changes (e.g., from navbar search)
    setPageQuery(initialQuery);
  }, [initialQuery]);


  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!initialQuery) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const allVideos = await getVideos();
        const filtered = allVideos.filter(video => 
          video.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
          (video.description && video.description.toLowerCase().includes(initialQuery.toLowerCase())) ||
          (video.channel?.name && video.channel.name.toLowerCase().includes(initialQuery.toLowerCase())) ||
          (video.tags && video.tags.some(tag => tag.toLowerCase().includes(initialQuery.toLowerCase())))
        );
        setSearchResults(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        toast({
          title: "Error searching videos",
          description: "The search signal seems lost in space. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [initialQuery, toast]);

  const handlePageSearch = (e) => {
    e.preventDefault();
    if (pageQuery.trim()) {
      setSearchParams({ q: pageQuery });
    } else {
      setSearchParams({}); // Clear query if input is empty
    }
  };

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

  if (!initialQuery && !loading) {
    return (
      <div className="text-center py-12 glass-card rounded-lg">
        <SearchX className="h-16 w-16 mx-auto text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Search the Cosmos</h2>
        <p className="text-muted-foreground mb-4">
          Enter a search term below to find videos from across the universe.
        </p>
        <form onSubmit={handlePageSearch} className="max-w-md mx-auto flex gap-2">
          <Input 
            type="search" 
            placeholder="e.g., Alien Cooking Show" 
            value={pageQuery}
            onChange={(e) => setPageQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handlePageSearch} className="md:hidden flex gap-2 mb-4"> {/* Search bar for mobile, hidden on md+ */}
        <Input 
          type="search" 
          placeholder="Search videos..." 
          value={pageQuery}
          onChange={(e) => setPageQuery(e.target.value)}
          className="flex-grow search-bar"
        />
        <Button type="submit" size="icon">
          <SearchX className="h-5 w-5" />
        </Button>
      </form>

      <h1 className="text-3xl font-bold">
        Search Results for: <span className="gradient-text">{initialQuery}</span>
      </h1>
      
      {loading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderSkeleton(8)}
        </div>
      ) : searchResults.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {searchResults.map((video, index) => (
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
          <SearchX className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Cosmic Signals Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any videos matching "{initialQuery}". Try a different search term or explore popular categories.
          </p>
          <Button asChild>
            <Link to="/categories">Explore Categories</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
