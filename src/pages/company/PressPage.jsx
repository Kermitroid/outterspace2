
import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Download, Mail, SatelliteDish } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pressReleases = [
  // {
  //   date: 'Galactic Year 3025, Cycle 5',
  //   title: 'BackFromOutterSpace Launches New Creator Stardust Tools',
  //   summary: 'Empowering creators with innovative ways to earn from their cosmic content, including subspace tipping and channel nebula memberships.',
  //   link: '#',
  // },
];

const PressPage = () => {
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
          BackFromOutterSpace Comms Array
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Stay updated with the latest transmissions, announcements, and media resources from BackFromOutterSpace.
        </motion.p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Latest Subspace Signals</h2>
        {pressReleases.length > 0 ? (
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <p className="text-sm text-muted-foreground mb-1">{release.date}</p>
                <h3 className="text-xl font-semibold mb-2 text-primary">{release.title}</h3>
                <p className="text-muted-foreground mb-3">{release.summary}</p>
                <Button variant="link" asChild className="p-0 h-auto">
                  <a href={release.link}>Decrypt Transmission &rarr;</a>
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-lg">
            <SatelliteDish className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Signals Detected</h2>
            <p className="text-muted-foreground">
              The comms array is quiet. All transmissions are currently classified or awaiting launch.
            </p>
          </div>
        )}
      </section>
      
      <section className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="glass-card p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Newspaper className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Media Datapack</h3>
          <p className="text-muted-foreground mb-3">
            Download our official holos, brand schematics, and other media assets.
          </p>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Datapack
          </Button>
        </motion.div>
        <motion.div 
          className="glass-card p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Mail className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Interstellar Inquiries</h3>
          <p className="text-muted-foreground mb-3">
            For press inquiries, please contact our galactic media relations team.
          </p>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Contact Comms
          </Button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default PressPage;
