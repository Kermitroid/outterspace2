import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Heart, 
  Zap, 
  Star, 
  Users, 
  Video, 
  Sparkles, 
  Eye,
  Gift,
  Camera
} from 'lucide-react';

const adultCategories = [
  { id: 'trending', label: 'Trending Now', icon: <Flame className="h-4 w-4" /> },
  { id: 'new', label: 'New Releases', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'popular', label: 'Most Popular', icon: <Zap className="h-4 w-4" /> },
  { id: 'amateur', label: 'Amateur', icon: <Camera className="h-4 w-4" /> },
  { id: 'exclusive', label: 'Exclusives', icon: <Star className="h-4 w-4" /> },
  { id: 'pov', label: 'POV', icon: <Eye className="h-4 w-4" /> },
  { id: 'threesome', label: 'Threesomes', icon: <Users className="h-4 w-4" /> },
  { id: 'cosplay', label: 'Cosplay', icon: <Gift className="h-4 w-4" /> },
  { id: 'hd', label: 'HD Videos', icon: <Video className="h-4 w-4" /> },
  { id: 'classic', label: 'Classic Gold', icon: <Heart className="h-4 w-4" /> },
];


const CategoryPills = ({ activeCategory = '' }) => {
  return (
    <div className="relative">
      <motion.div 
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, staggerChildren: 0.05 }}
      >
        {adultCategories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to={`/categories?category=${category.id.toLowerCase().replace(/\s+/g, '-')}`}
              className={`category-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category.id.toLowerCase().replace(/\s+/g, '-')
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 hover:bg-secondary'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
    </div>
  );
};

export default CategoryPills;