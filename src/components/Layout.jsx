
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <motion.main 
          className="flex-1 px-4 md:px-6 py-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
