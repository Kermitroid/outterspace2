
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Facebook,
  Youtube,
  Rocket
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Rocket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">BackFromOutterSpace</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate video sharing platform for content from beyond.
            </p>
          </div>
          
          <div>
            <p className="font-medium mb-4 text-foreground">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/company/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/company/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/company/press" className="hover:text-primary transition-colors">Press</Link></li>
              <li><Link to="/company/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4 text-foreground">Support</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/support/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/support/safety" className="hover:text-primary transition-colors">Safety Center</Link></li>
              <li><Link to="/support/community" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
              <li><Link to="/support/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4 text-foreground">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/copyright" className="hover:text-primary transition-colors">Copyright</Link></li>
              <li><Link to="/legal/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} BackFromOutterSpace. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </motion.a>
            
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </motion.a>
            
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </motion.a>
            
            <motion.a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
