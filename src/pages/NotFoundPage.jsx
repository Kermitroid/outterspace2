import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AlertTriangle className="h-24 w-24 text-primary mb-8 pulse-animation" />
      
      <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Oops! Page Not Found</h2>
      
      <p className="text-muted-foreground max-w-md mb-8">
        The page you're looking for doesn't exist, might have been removed, or is temporarily unavailable.
        Let's get you back on track!
      </p>
      
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go to Homepage</Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>

      <div className="mt-12">
        <p className="text-sm text-muted-foreground">Here are some helpful links instead:</p>
        <nav className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <Link to="/search" className="hover:text-primary transition-colors">Search</Link>
          <Link to="/profile" className="hover:text-primary transition-colors">Your Profile</Link>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
        </nav>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;