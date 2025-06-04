
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, VolumeX, ShieldAlert, HeartHandshake as Handshake } from 'lucide-react'; // Added Handshake

const guidelines = [
  {
    icon: <Heart className="h-8 w-8 text-green-500" />,
    title: 'Be Respectful Across All Species',
    description: 'Treat others as you would like to be treated, regardless of their planetary origin or number of tentacles. We encourage diverse opinions but prohibit harassment, bullying, and hate speech.',
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: 'Keep it Authentic & Verifiable',
    description: 'Share genuine transmissions. Do not impersonate other entities or spread misinformation that could cause intergalactic incidents.',
  },
  {
    icon: <VolumeX className="h-8 w-8 text-red-500" />,
    title: 'No Harmful or Restricted Content',
    description: 'Do not post content that is sexually explicit by Earth standards, graphically violent, promotes illegal activities across star systems, or endangers younglings of any species.',
  },
  {
    icon: <ShieldAlert className="h-8 w-8 text-blue-500" />,
    title: 'Respect Copyright & Privacy Protocols',
    description: 'Only upload content you have the universal rights to share. Do not post private data logs of others without their explicit consent.',
  },
];

const CommunityPage = () => {
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
          BackFromOutterSpace Galactic Accords
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Our Accords are designed to ensure BackFromOutterSpace remains a safe, vibrant, and respectful sector for all beings. By using BackFromOutterSpace, you agree to these Accords and our Terms of Service.
        </motion.p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {guidelines.map((guideline, index) => (
          <motion.div 
            key={index}
            className="glass-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-3">
              {guideline.icon}
              <h3 className="text-xl font-semibold">{guideline.title}</h3>
            </div>
            <p className="text-muted-foreground">{guideline.description}</p>
          </motion.div>
        ))}
      </section>
      
      <section className="text-center glass-card p-8 rounded-lg">
        <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Building a Harmonious Galaxy Together</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We rely on our cosmic community members to help us uphold these Accords. If you see content that violates our policies, please report it. Together, we can make BackFromOutterSpace a beacon of positivity.
        </p>
      </section>
    </motion.div>
  );
};

export default CommunityPage;
