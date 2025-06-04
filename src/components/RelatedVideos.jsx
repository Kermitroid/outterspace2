
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Eye, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const RelatedVideos = ({ videos, currentVideoId }) => {
  const filteredVideos = videos.filter(video => video && video.id !== currentVideoId); // Add check for video existence

  if (filteredVideos.length === 0) {
    return (
      <div className="space-y-4 glass-card p-4 rounded-lg">
        <h3 className="text-lg font-medium text-foreground">Related Videos</h3>
        <div className="text-center py-4">
          <Film className="h-10 w-10 mx-auto text-primary mb-2" />
          <p className="text-sm text-muted-foreground">No related videos found in this galaxy.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">Related Videos</h3>
      
      <div className="space-y-4">
        {filteredVideos.map((video, index) => (
          <motion.div 
            key={video.id}
            className="flex gap-3 group glass-card p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/video/${video.id}`} className="flex-shrink-0 relative w-40 h-24 rounded-md overflow-hidden">
              {video.thumbnailUrl ? (
                 <img  
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  alt={`Thumbnail for ${video.title}`}
                  src={video.thumbnailUrl} />
              ) : (
                <div className="w-full h-full object-cover bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              {video.duration && (
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {video.duration}
                </div>
              )}
            </Link>
            
            <div className="flex-1 min-w-0">
              <Link to={`/video/${video.id}`} className="block">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                  {video.title || 'Untitled Video'}
                </h4>
                
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={video.channel?.avatar || ''} alt={video.channel?.name || 'Channel'} />
                    <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{video.channel?.name || 'Unknown Channel'}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views || 0}
                  </span>
                  <span>{video.uploadedAt || 'N/A'}</span>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
