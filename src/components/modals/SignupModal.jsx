import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const SignupModal = ({ isOpen, onOpenChange, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields to create your cosmic identity.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Subspace passwords do not match. Please re-enter.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
        toast({
            title: "Password Too Short",
            description: "Password should be at least 6 characters.",
            variant: "destructive",
        });
        return;
    }
    
    setIsLoading(true);
    const { error } = await signup({ name, username, email, password });
    setIsLoading(false);

    if (!error) {
      onOpenChange(false); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!isLoading) onOpenChange(open); }}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Create Your Cosmic Identity</DialogTitle>
          <DialogDescription>
            Join BackFromOutterSpace! Fill in your details to start your journey.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name-signup" className="text-right">
                Name
              </Label>
              <Input
                id="name-signup"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Your Galactic Alias"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username-signup" className="text-right">
                Username
              </Label>
              <Input
                id="username-signup"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
                placeholder="Unique callsign (optional)"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email-signup" className="text-right">
                Email
              </Label>
              <Input
                id="email-signup"
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
              <Label htmlFor="password-signup" className="text-right">
                Password
              </Label>
              <Input
                id="password-signup"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                placeholder="Secure Subspace Key (min. 6)"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password-signup" className="text-right">
                Confirm Key
              </Label>
              <Input
                id="confirm-password-signup"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
                placeholder="Re-enter Subspace Key"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center">
             <Button type="button" variant="link" onClick={() => { if (!isLoading) { onOpenChange(false); onSwitchToLogin(); }}} className="p-0 h-auto" disabled={isLoading}>
              Already have an account? Login here.
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>Cancel Transmission</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;