import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Flame, 
  Clock, 
  ThumbsUp, 
  History, 
  Bookmark, 
  X,
  Film,
  Heart,
  Star,
  Zap,
  Rocket,
  Users,
  Sparkles,
  Eye,
  Gift,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', path: '/' },
    { icon: <Flame className="h-5 w-5" />, label: 'Trending', path: '/categories?category=trending' },
    { icon: <Sparkles className="h-5 w-5" />, label: 'New Releases', path: '/categories?category=new' },
    { icon: <Film className="h-5 w-5" />, label: 'All Categories', path: '/categories' },
    { icon: <ThumbsUp className="h-5 w-5" />, label: 'Liked Videos', path: '/profile?tab=liked' },
    { icon: <History className="h-5 w-5" />, label: 'Watch History', path: '/profile?tab=history' },
    { icon: <Bookmark className="h-5 w-5" />, label: 'Saved Playlists', path: '/profile?tab=saved' },
  ];

  const adultSiteCategories = [
    { icon: <Camera className="h-4 w-4" />, label: 'Amateur', path: '/categories?category=amateur' },
    { icon: <Star className="h-4 w-4" />, label: 'Exclusives', path: '/categories?category=exclusive' },
    { icon: <Eye className="h-4 w-4" />, label: 'POV', path: '/categories?category=pov' },
    { icon: <Users className="h-4 w-4" />, label: 'Threesomes', path: '/categories?category=threesome' },
    { icon: <Gift className="h-4 w-4" />, label: 'Cosplay', path: '/categories?category=cosplay' },
    { icon: <Zap className="h-4 w-4" />, label: 'Popular Now', path: '/categories?category=popular' },
    { icon: <Heart className="h-4 w-4" />, label: 'Classic Gold', path: '/categories?category=classic' },
  ];


  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            <motion.div 
              className="fixed top-0 left-0 h-full w-64 sidebar z-50 md:hidden overflow-y-auto"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-4 flex justify-between items-center border-b border-border/40">
                <div className="flex items-center gap-2">
                   <Rocket className="h-6 w-6 text-primary" />
                   <h2 className="text-xl font-bold gradient-text">BackFromOutterSpace</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.path} 
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-secondary/80'
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
                
                {adultSiteCategories.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <h3 className="px-3 mb-2 text-sm font-medium text-muted-foreground">Hot Categories</h3>
                    <nav className="space-y-1">
                      {adultSiteCategories.map((category) => (
                        <NavLink 
                          key={category.path} 
                          to={category.path}
                          onClick={onClose}
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                              isActive 
                                ? 'bg-primary/20 text-primary' 
                                : 'hover:bg-secondary/80'
                            }`
                          }
                        >
                          {category.icon}
                          <span>{category.label}</span>
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="hidden md:block w-64 sidebar border-r border-border/40 overflow-y-auto">
        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-secondary/80'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {adultSiteCategories.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/40">
              <h3 className="px-3 mb-2 text-sm font-medium text-muted-foreground">Hot Categories</h3>
              <nav className="space-y-1">
                {adultSiteCategories.map((category) => (
                  <NavLink 
                    key={category.path} 
                    to={category.path}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-primary/20 text-primary' 
                          : 'hover:bg-secondary/80'
                      }`
                    }
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;