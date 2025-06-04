import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const LoginModal = ({ isOpen, onOpenChange, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    const { error } = await login({ email, password });
    setIsLoading(false);

    if (!error) {
      onOpenChange(false); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!isLoading) onOpenChange(open); }}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Login to Your Holo-Account</DialogTitle>
          <DialogDescription>
            Access your cosmic content and settings. Enter your credentials below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email-login" className="text-right">
                Email
              </Label>
              <Input
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="your.signal@galaxy.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password-login" className="text-right">
                Password
              </Label>
              <Input
                id="password-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                placeholder="Enter your subspace key"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center">
            <Button type="button" variant="link" onClick={() => { if (!isLoading) { onOpenChange(false); onSwitchToSignup(); }}} className="p-0 h-auto" disabled={isLoading}>
              No account? Transmit a signup signal!
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>Cancel Transmission</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;