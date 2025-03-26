
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BatteryCharging, ArrowRight, ChevronRight } from 'lucide-react';
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
        navigate('/dashboard');
      } else {
        toast.error("Please enter both email and password");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-ev-accent/20 to-transparent blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-blue-400/10 to-transparent blur-3xl" />
        </div>

        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-ev-accent/10 p-3 rounded-2xl">
                <BatteryCharging className="h-10 w-10 text-ev-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Smart<span className="text-ev-accent">EV</span> Explorer
            </h1>
            <p className="text-ev-text-light max-w-md mx-auto">
              Find charging stations, optimize routes, and earn rewards with our intelligent EV companion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setIsSignUp(false)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!isSignUp ? 'bg-white shadow-soft text-ev-text' : 'text-ev-text-light'}`}
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setIsSignUp(true)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isSignUp ? 'bg-white shadow-soft text-ev-text' : 'text-ev-text-light'}`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-ev w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-ev w-full"
                      />
                    </div>
                    {isSignUp && (
                      <div>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          className="input-ev w-full"
                        />
                      </div>
                    )}
                    {!isSignUp && (
                      <div className="text-right">
                        <a href="#" className="text-sm text-ev-accent hover:text-ev-accent-dark">
                          Forgot password?
                        </a>
                      </div>
                    )}
                    <div>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="btn-ev w-full flex items-center justify-center"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                          </div>
                        ) : (
                          <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-ev-text-light">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button 
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="ml-1 text-ev-accent hover:text-ev-accent-dark"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <button 
              onClick={() => navigate('/dashboard')} 
              className="inline-flex items-center text-ev-text-light hover:text-ev-text transition-colors"
            >
              <span>Continue as guest</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
