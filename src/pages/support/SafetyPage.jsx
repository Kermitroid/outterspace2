
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, MessageCircle as MessageCircleWarning, Info, Binary } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const safetyTopics = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Securing Your Holo-Account',
    description: 'Learn to create strong passcodes, enable multi-factor authentication across dimensions, and recognize phishing nebulae to keep your account secure.',
    link: '#account-security',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Our Galactic Community Guidelines',
    description: 'Understand the protocols that keep BackFromOutterSpace a positive and respectful sector for all lifeforms. Report content that violates these guidelines.',
    link: '/support/community',
  },
  {
    icon: <MessageCircleWarning className="h-8 w-8 text-primary" />,
    title: 'Reporting Hostile Transmissions',
    description: 'Find out how to report videos, comments, or users that you believe are inappropriate, abusive, or violate our intergalactic policies.',
    link: '#reporting',
  },
  {
    icon: <Binary className="h-8 w-8 text-primary" />, // Changed icon
    title: 'Resources for Young Stargazers & Guardians',
    description: 'Information and tools to help guardians guide young explorers and ensure a safe online voyage through the cosmos.',
    link: '#parental-resources',
  },
];

const SafetyPage = () => {
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
          BackFromOutterSpace Safety Beacon
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Your safety is our prime directive. Learn about the tools and resources we provide to help you manage your experience and stay safe on BackFromOutterSpace.
        </motion.p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {safetyTopics.map((topic, index) => (
          <motion.div 
            key={index}
            className="glass-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-3">
              {topic.icon}
              <h3 className="text-xl font-semibold text-primary">{topic.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{topic.description}</p>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to={topic.link}>Learn More &rarr;</Link>
            </Button>
          </motion.div>
        ))}
      </section>
      
      <section className="text-center glass-card p-8 rounded-lg">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Our Commitment to Cosmic Safety</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          BackFromOutterSpace is committed to fostering a safe and inclusive galaxy. We invest in advanced AI, human (and non-human) moderation, and inter-species partnerships to prevent harm and respond effectively to violations of our policies.
        </p>
        <Button size="lg" asChild>
          <Link to="/legal/terms">Read Our Galactic Decrees</Link>
        </Button>
      </section>
    </motion.div>
  );
};

export default SafetyPage;
