
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, UserCog, Mail, EyeOff } from 'lucide-react'; // Added EyeOff

const PrivacyPage = () => {
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
          Universal Privacy Policy
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
          BackFromOutterSpace ("we," "us," "our," or "the Collective") is committed to protecting your privacy across all known dimensions. This Universal Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
        </p>

        <h2 className="flex items-center gap-2"><Database className="h-6 w-6" /> 1. Information We Collect from the Ether</h2>
        <p>
          We may collect personal information that you provide to us directly, such as when you create a holo-account, upload content, or communicate with us via subspace channels. This may include your designated name, species, home planet, email address, and other contact coordinates. We also collect information automatically when you use our Services, such as your IP address (if applicable in your dimension), browser type, and usage data logs.
        </p>

        <h2 className="flex items-center gap-2"><UserCog className="h-6 w-6" /> 2. How We Use Your Cosmic Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our Services across the multiverse.</li>
          <li>Improve, personalize, and expand our Services for all lifeforms.</li>
          <li>Understand and analyze how you use our Services.</li>
          <li>Develop new products, services, features, and functionalities.</li>
          <li>Communicate with you, either directly or through one of our intergalactic partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional transmissions.</li>
          <li>Process your transactions (e.g., stardust payments).</li>
          <li>Find and prevent fraud and hostile takeovers.</li>
        </ul>

        <h2 className="flex items-center gap-2"><Lock className="h-6 w-6" /> 3. How We Share Your Information Across Star Systems</h2>
        <p>
          We do not sell your personal information to rogue traders or data pirates. We may share your information with third-party service providers to perform tasks on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. We may also share information if required by intergalactic law or to protect our rights and the safety of the Collective.
        </p>
        
        <h2 className="flex items-center gap-2"><EyeOff className="h-6 w-6" /> 4. Your Choices and Rights in This Universe</h2>
        <p>
          You may have certain rights regarding your personal information, subject to local dimensional and data protection laws. These may include the right to access, correct, update, or delete your information. You can usually manage your account information through your profile settings or by sending a secure transmission.
        </p>
        
        <h2 className="flex items-center gap-2">5. Data Security Shields</h2>
        <p>
          We use administrative, technical, and physical security measures, including energy shields and cloaking devices, to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, especially against advanced alien technology.
        </p>

        <h2 className="flex items-center gap-2">6. Changes to This Universal Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and, if significant, via a general subspace broadcast.
        </p>

        <h2 className="flex items-center gap-2"><Mail className="h-6 w-6" /> 7. Contact Galactic Command Privacy Division</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@backfromoutterspace.com.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPage;
