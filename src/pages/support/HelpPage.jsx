
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, BookOpen, LifeBuoy, MessageSquare, Microscope as Telescope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const faqs = [
  {
    question: 'How do I upload a video from my starship?',
    answer: 'To upload a video, click the "Upload" icon (looks like an upward arrow) in the top navigation bar. You must be logged into your BackFromOutterSpace account. Select your video file from your ship\'s databanks, add a title, description, and relevant cosmic tags, then click "Transmit".',
  },
  {
    question: 'How can I change my subspace password?',
    answer: 'You can change your password in your Profile settings. Navigate to Profile > Settings > Account and look for the password change option. Make it strong enough to repel psychic probes!',
  },
  {
    question: 'What are the Galactic Community Guidelines?',
    answer: 'Our community guidelines are designed to keep BackFromOutterSpace safe and enjoyable for all beings. You can find them linked in the footer or by searching "Community Guidelines" here. Violators may be exiled to the Kessel run.',
  },
  {
    question: 'How does video stardust (monetization) work?',
    answer: 'Video stardust options vary. We offer ad revenue sharing from across the galaxy, channel nebula memberships, and tipping features for eligible creators. Check your Creator Holo-Dashboard for more info.',
  },
];

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          BackFromOutterSpace Holo-Help
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Welcome to the Holo-Help Center. Find answers to your cosmic queries, learn to navigate our platform, and get support from across the void.
        </motion.p>
        <form className="max-w-xl mx-auto relative">
          <Input 
            type="search"
            placeholder="Search the star charts..."
            className="w-full py-3 px-4 pr-12 text-base rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Transmitted Queries</h2>
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <button 
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-primary/10 transition-colors rounded-t-lg"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <h3 className="text-lg font-medium text-primary">{faq.question}</h3>
                  <HelpCircle className={`h-5 w-5 text-primary transform transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {activeFAQ === index && (
                  <motion.div 
                    className="p-4 border-t border-primary/20"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-lg">
            <Telescope className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Matching Star Patterns</h2>
            <p className="text-muted-foreground">
              No FAQs match your search for "{searchTerm}". Try rephrasing your query or contact support.
            </p>
          </div>
        )}
      </section>
      
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <motion.div 
          className="glass-card p-6 rounded-lg"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Starship Manuals</h3>
          <p className="text-muted-foreground mb-3">
            In-depth guides on using BackFromOutterSpace features.
          </p>
          <Button variant="outline">Browse Manuals</Button>
        </motion.div>
        <motion.div 
          className="glass-card p-6 rounded-lg"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <LifeBuoy className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Anomaly Troubleshooting</h3>
          <p className="text-muted-foreground mb-3">
            Solutions to common cosmic issues and technical glitches.
          </p>
          <Button variant="outline">Get Help</Button>
        </motion.div>
        <motion.div 
          className="glass-card p-6 rounded-lg"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Contact Starfleet Support</h3>
          <p className="text-muted-foreground mb-3">
            Can't find an answer? Our support crew is on standby.
          </p>
          <Button>Contact Us</Button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HelpPage;
