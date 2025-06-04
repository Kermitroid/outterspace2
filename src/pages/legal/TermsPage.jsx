
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UserCheck, AlertOctagon, Shield, Gavel } from 'lucide-react';

const TermsPage = () => {
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
          Galactic Terms of Service
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
          Welcome to BackFromOutterSpace! These Galactic Terms of Service ("Terms") govern your access to and use of the BackFromOutterSpace website, applications, and services (collectively, the "Services"). Please read these Terms carefully before using the Services.
        </p>

        <h2 className="flex items-center gap-2"><UserCheck className="h-6 w-6" /> 1. Acceptance of Galactic Terms</h2>
        <p>
          By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services from this or any other dimension.
        </p>

        <h2 className="flex items-center gap-2"><FileText className="h-6 w-6" /> 2. Your Holo-Account</h2>
        <p>
          You may need to register for an account to access some features of the Services. You are responsible for safeguarding your account credentials and for all activities that occur under your account across all known universes. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="flex items-center gap-2"><Shield className="h-6 w-6" /> 3. Content and Conduct in the Cosmos</h2>
        <p>
          You are responsible for the content you upload, share, or display on or through the Services ("User Content"). You agree not to post User Content that is illegal by intergalactic law, harmful, infringing, defamatory, or otherwise objectionable. We reserve the right to remove User Content that violates these Terms or our Community Accords.
        </p>
        <p>
          You grant BackFromOutterSpace a universal, non-exclusive, royalty-free license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Services.
        </p>

        <h2 className="flex items-center gap-2"><AlertOctagon className="h-6 w-6" /> 4. Prohibited Interstellar Activities</h2>
        <p>
          You agree not to engage in any of the following prohibited activities: (a) copying, distributing, or disclosing any part of the Services in any medium, including via subspace relays; (b) using any automated system, including "drones," "probes," "nanobots," etc., to access the Services; (c) transmitting spam, chain letters, or other unsolicited cosmic noise; (d) attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services.
        </p>
        
        <h2 className="flex items-center gap-2"><Gavel className="h-6 w-6" /> 5. Termination of Signal</h2>
        <p>
          We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. This may result in your signal being lost to the void.
        </p>
        
        <h2 className="flex items-center gap-2">6. Disclaimers and Limitation of Liability in the Void</h2>
        <p>
          The Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied from any species. BackFromOutterSpace shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits, stardust, or revenues.
        </p>

        <h2 className="flex items-center gap-2">7. Changes to Galactic Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Continued use after changes means acceptance.
        </p>

        <h2 className="flex items-center gap-2">8. Contact Galactic Command</h2>
        <p>
          If you have any questions about these Terms, please contact us at legal@backfromoutterspace.com.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TermsPage;
