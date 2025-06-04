
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus, Lightbulb, Bug, CheckCircle, Send } from 'lucide-react'; // Added Send
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast({
        title: "Empty Transmission!",
        description: "Please enter your feedback before sending your signal.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send to a backend
    console.log('Feedback submitted:', { type: feedbackType, text: feedbackText });
    setIsSubmitted(true);
    setFeedbackText(''); // Clear the textarea
    
    toast({
      title: "Signal Received!",
      description: "Thanks for helping us improve BackFromOutterSpace. Your feedback is valuable cosmic dust!",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="container mx-auto py-12 px-4 text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold gradient-text">Thank You, Earthling (or other being)!</h1>
        <p className="text-lg text-muted-foreground">
          Your feedback has been successfully transmitted. We appreciate you taking the time to help us make BackFromOutterSpace even more stellar.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Send Another Signal</Button>
      </motion.div>
    );
  }

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
          Share Your Cosmic Feedback
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          We value your input from any dimension! Let us know what you think about BackFromOutterSpace, suggest new features from your timeline, or report any space-time anomalies.
        </motion.p>
      </section>

      <motion.form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto glass-card p-8 rounded-lg space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div>
          <Label className="text-lg font-medium mb-2 block">What type of signal are you sending?</Label>
          <RadioGroup defaultValue="general" value={feedbackType} onValueChange={setFeedbackType} className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-md flex-1 hover:bg-primary/10 transition-colors">
              <RadioGroupItem value="general" id="r1" />
              <Label htmlFor="r1" className="flex items-center gap-2 cursor-pointer"><MessageSquarePlus className="h-5 w-5 text-primary"/> General Transmission</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-md flex-1 hover:bg-primary/10 transition-colors">
              <RadioGroupItem value="feature" id="r2" />
              <Label htmlFor="r2" className="flex items-center gap-2 cursor-pointer"><Lightbulb className="h-5 w-5 text-yellow-500"/> New Constellation (Feature)</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-md flex-1 hover:bg-primary/10 transition-colors">
              <RadioGroupItem value="bug" id="r3" />
              <Label htmlFor="r3" className="flex items-center gap-2 cursor-pointer"><Bug className="h-5 w-5 text-red-500"/> Space Anomaly (Bug)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="feedbackText" className="text-lg font-medium mb-2 block">Your Message</Label>
          <Textarea 
            id="feedbackText"
            placeholder={`Describe your ${feedbackType} signal here...`}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[150px] text-base"
          />
        </div>
        
        <Button type="submit" size="lg" className="w-full gap-2">
          <Send className="h-5 w-5" />
          Transmit Feedback
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default FeedbackPage;
