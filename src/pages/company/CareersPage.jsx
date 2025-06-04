
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Microscope as Telescope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobOpenings = [
  // {
  //   title: 'Senior Frontend Developer',
  //   location: 'Remote Quadrant',
  //   department: 'Starship Engineering',
  //   description: 'Join our talented engineering crew to build and enhance the BackFromOutterSpace platform. Expertise in React, TailwindCSS, and warp-speed web technologies required.',
  // },
];

const CareersPage = () => {
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
          Join Our Crew at BackFromOutterSpace
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          We're building the future of interstellar video and looking for passionate beings to help us on our mission. Explore exciting opportunities to launch your career with us.
        </motion.p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Current Openings</h2>
        {jobOpenings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-lg flex flex-col"
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">{job.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Briefcase className="h-4 w-4 mr-1" /> {job.department}
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">{job.description}</p>
                <Button className="mt-auto w-full">Apply via HoloNet</Button>
              </motion.div>
            ))}
          </div>
        ) : (
           <div className="text-center py-12 glass-card rounded-lg">
            <Telescope className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Open Transmissions</h2>
            <p className="text-muted-foreground">
              No current openings in this star system. Check back later or send a probe with your resume!
            </p>
          </div>
        )}
      </section>
      
      <section className="text-center glass-card p-8 rounded-lg">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Why Join Our Fleet?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          At BackFromOutterSpace, we foster a collaborative and innovative cosmic environment. We offer competitive stardust salaries, comprehensive benefits, and the opportunity to make a real impact on a universal platform.
        </p>
        <Button variant="outline" size="lg">Learn About Our Starship Culture</Button>
      </section>
    </motion.div>
  );
};

export default CareersPage;
