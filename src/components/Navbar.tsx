
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BatteryCharging, 
  MapPin, 
  Trophy, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: <BatteryCharging className="h-5 w-5" /> 
    },
    { 
      path: '/stations', 
      name: 'Find Stations', 
      icon: <MapPin className="h-5 w-5" /> 
    },
    { 
      path: '/rewards', 
      name: 'Rewards', 
      icon: <Trophy className="h-5 w-5" /> 
    },
  ];
  
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-soft" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <BatteryCharging className="h-7 w-7 text-ev-accent" />
            <span className="font-semibold text-xl tracking-tight">
              Smart<span className="text-ev-accent">EV</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link flex items-center space-x-1.5",
                  location.pathname === link.path && "nav-link-active",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <Link 
              to="/" 
              className="flex items-center space-x-1.5 text-ev-text-light hover:text-ev-text transition-colors duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-ev-text" />
            ) : (
              <Menu className="h-6 w-6 text-ev-text" />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden flex flex-col animate-fade-in">
          <nav className="flex flex-col space-y-8 py-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center space-x-3 text-lg py-2",
                  location.pathname === link.path 
                    ? "text-ev-accent font-medium" 
                    : "text-ev-text"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto mb-10 border-t border-gray-100 pt-6">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-lg py-2 text-ev-text-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
