
import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Info, CheckCircle, Brain } from 'lucide-react'; // Added Brain for "Understanding"
import { Button } from '@/components/ui/button';

const CookiePolicyPage = () => {
  return (
    <motion.div 
      className="container mx-auto py-12 px-4 space-y-8"
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
          Cosmic Cookie Protocol
        </motion.h1>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Last Updated: Stardate {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      </section>

      <motion.div 
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none glass-card p-6 md:p-8 rounded-lg bg-card text-card-foreground prose-headings:text-primary prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <p>
          This Cosmic Cookie Protocol explains how BackFromOutterSpace ("we," "us," or "our") uses cookies, pixel tags, local shared objects (Flash cookies), web beacons, and other similar technologies (collectively, "Cookies") to recognize you when you visit our website and use our Services from any star system. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h2 className="flex items-center gap-2"><Cookie className="h-6 w-6" /> 1. What Are These "Cookies" You Speak Of?</h2>
        <p>
          Cookies are small data files (not the edible kind, unfortunately) that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information and remember your preferences (like your favorite nebula).
        </p>
        <p>
          Cookies set by the website owner (in this case, BackFromOutterSpace) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising from other galaxies, interactive content, and analytics from distant probes).
        </p>

        <h2 className="flex items-center gap-2"><Brain className="h-6 w-6" /> 2. Why Do We Use These Data Imprints?</h2>
        <p>
          We use first-party and third-party Cookies for several reasons. Some Cookies are required for technical reasons in order for our Services to operate across the space-time continuum, and we refer to these as "essential" or "strictly necessary" Cookies. Other Cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve Cookies through our Services for advertising, analytics, and other purposes. This is described in more detail below.
        </p>
        
        <h3 className="flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Types of Cookies we deploy:</h3>
        <ul>
          <li><strong>Essential Starship Cookies:</strong> These Cookies are strictly necessary to provide you with services available through our Services and to use some of its features, such as access to secure data vaults.</li>
          <li><strong>Performance and Functionality Nebula Cookies:</strong> These Cookies are used to enhance the performance and functionality of our Services but are non-essential to their use. However, without these Cookies, certain functionality (like holo-videos) may become unavailable or glitchy.</li>
          <li><strong>Analytics and Customization Wormhole Cookies:</strong> These Cookies collect information that is used either in aggregate form to help us understand how our Services are being used across different star clusters or how effective our marketing campaigns are, or to help us customize our Services for your species.</li>
          <li><strong>Advertising Quasar Cookies:</strong> These Cookies are used to make advertising messages more relevant to you and your quadrant. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your observed interests.</li>
        </ul>

        <h2 className="flex items-center gap-2"><Settings className="h-6 w-6" /> 3. How Can You Control These Cosmic Imprints?</h2>
        <p>
          You have the right to decide whether to accept or reject Cookies. You can exercise your Cookie preferences by adjusting settings in your browser or through any cookie consent banner we may deploy.
        </p>
        <p>
          Most web browsers (even those on alien tech) allow some control of most Cookies through the browser settings. To find out more about Cookies, including how to see what Cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a> (assuming these sites exist in your reality).
        </p>
        <p>
          Please note that if you choose to reject Cookies, you may still use our website though your access to some functionality and areas of our website may be restricted or experience temporal distortions.
        </p>

        <h2 className="flex items-center gap-2">4. Changes to This Cosmic Cookie Protocol</h2>
        <p>
          We may update this Cookie Protocol from time to time in order to reflect, for example, changes to the Cookies we use or for other operational, legal or regulatory reasons across the known galaxies. Please therefore re-visit this Cookie Protocol regularly to stay informed about our use of Cookies and related technologies.
        </p>

        <h2 className="flex items-center gap-2">5. Contact the Galactic Cookie Council</h2>
        <p>
          If you have any questions about our use of Cookies or other technologies, please email us at cookies@backfromoutterspace.com.
        </p>
        <div className="mt-8 text-center">
          <Button onClick={() => alert('Cookie settings management UI would appear here. Adjust your deflector shields!')}>Manage Cookie Preferences</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CookiePolicyPage;
