
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Users, Target, Rocket } from 'lucide-react';

const AboutPage = () => {
  return (
    <motion.div 
      className="container mx-auto py-12 px-4 space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold gradient-text mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          About BackFromOutterSpace
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          BackFromOutterSpace is your portal to videos from beyond the ordinary. We connect creators of unique content with audiences seeking extraordinary experiences.
        </motion.p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <motion.div 
          className="glass-card p-6 rounded-lg text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-muted-foreground">
            To launch creativity into new orbits and inspire discovery by providing a cutting-edge platform for video content that is out of this world.
          </p>
        </motion.div>
        <motion.div 
          className="glass-card p-6 rounded-lg text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Crew</h2>
          <p className="text-muted-foreground">
            A dedicated crew of developers, designers, and cosmic explorers committed to building the future of interstellar video sharing.
          </p>
        </motion.div>
        <motion.div 
          className="glass-card p-6 rounded-lg text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Target className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-muted-foreground">
            To be the leading universal destination for video content, fostering a vibrant community where every being can share their stories and connect with the cosmos.
          </p>
        </motion.div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Cosmic Journey</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Whether you're a creator beaming signals from a distant galaxy, or a viewer seeking new dimensions of entertainment, BackFromOutterSpace is your launchpad.
        </p>
      </section>
    </motion.div>
  );
};

export default AboutPage;
