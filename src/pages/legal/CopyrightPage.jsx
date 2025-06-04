
import React from 'react';
import { motion } from 'framer-motion';
import { Copyright, AlertTriangle, FileCheck2, Mail, ShieldQuestion } from 'lucide-react'; // Added ShieldQuestion

const CopyrightPage = () => {
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
          Intergalactic Copyright Protocol
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
          BackFromOutterSpace respects the intellectual property rights of all sentient beings and expects its users to do the same. It is BackFromOutterSpace's policy, in appropriate circumstances and at its discretion, to disable and/or terminate the accounts of users who repeatedly infringe or are repeatedly charged with infringing the copyrights or other intellectual property rights of others, as recognized by the Galactic Copyright Alliance.
        </p>

        <h2 className="flex items-center gap-2"><Copyright className="h-6 w-6" /> 1. DMCA (Dimensional Material Copyright Act) Notification</h2>
        <p>
          If you are a copyright owner or an agent thereof from any known dimension and believe that any Content infringes upon your copyrights, you may submit a notification pursuant to the DMCA by providing our Copyright Adjudicator with the following information in writing (see Universal Copyright Code 17.U.S.C.512(c)(3) for further detail):
        </p>
        <ul>
          <li>A physical or energy signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
          <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;</li>
          <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit the service provider to locate the material (e.g., hyperspace coordinates);</li>
          <li>Information reasonably sufficient to permit the service provider to contact you, such as a subspace comm channel, planetary address, or, if available, an electronic mail;</li>
          <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law of your home world/dimension; and</li>
          <li>A statement that the information in the notification is accurate, and under penalty of perjury (or equivalent in your legal system), that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        </ul>
        <p>
          Our designated Copyright Adjudicator to receive notifications of claimed infringement is: copyright@backfromoutterspace.com
        </p>

        <h2 className="flex items-center gap-2"><FileCheck2 className="h-6 w-6" /> 2. Counter-Notification from the Accused Star System</h2>
        <p>
          If you believe that your User Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your User Content, you may send a counter-notice containing the following information to the Copyright Adjudicator:
        </p>
        <ul>
          <li>Your physical or energy signature;</li>
          <li>Identification of the User Content that has been removed or to which access has been disabled and the location at which the User Content appeared before it was removed or disabled;</li>
          <li>A statement that you have a good faith belief that the User Content was removed or disabled as a result of mistake or a misidentification of the User Content (e.g., blaming solar flares);</li>
          <li>Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the Intergalactic Court of Justice, and a statement that you will accept service of process from the entity who provided notification of the alleged infringement.</li>
        </ul>

        <h2 className="flex items-center gap-2"><AlertTriangle className="h-6 w-6" /> 3. Repeat Infringers Banished to the Outer Rim</h2>
        <p>
          BackFromOutterSpace will terminate a user's access to the Service if, under appropriate circumstances, the user is determined to be a repeat infringer. No appeals to the High Council will be entertained.
        </p>

        <h2 className="flex items-center gap-2"><ShieldQuestion className="h-6 w-6" /> 4. Questions Regarding Copyright?</h2>
        <p>
          If you have any questions about this Intergalactic Copyright Protocol, please contact us at copyright@backfromoutterspace.com.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CopyrightPage;
