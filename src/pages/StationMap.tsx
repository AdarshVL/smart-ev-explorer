
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Filter, 
  Zap, 
  Compass,
  Navigation,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ChargingCard from '@/components/ChargingCard';

// Sample data
const allStations = [
  {
    id: '1',
    name: 'EcoCharge Station',
    location: 'Downtown',
    distance: '0.8 miles',
    availablePorts: 4,
    totalPorts: 6,
    chargingSpeed: '150 kW',
    waitTime: '5 min',
    isAvailable: true,
    coordinates: { lat: 40.712, lng: -74.006 }
  },
  {
    id: '2',
    name: 'GreenPower Hub',
    location: 'Central Park',
    distance: '1.2 miles',
    availablePorts: 1,
    totalPorts: 4,
    chargingSpeed: '50 kW',
    waitTime: '15 min',
    isAvailable: true,
    coordinates: { lat: 40.714, lng: -74.002 }
  },
  {
    id: '3',
    name: 'EVolution Station',
    location: 'Westside Mall',
    distance: '2.4 miles',
    availablePorts: 0,
    totalPorts: 8,
    chargingSpeed: '350 kW',
    waitTime: '30 min',
    isAvailable: false,
    coordinates: { lat: 40.718, lng: -74.012 }
  },
  {
    id: '4',
    name: 'PowerUp Center',
    location: 'North Station',
    distance: '3.1 miles',
    availablePorts: 3,
    totalPorts: 5,
    chargingSpeed: '250 kW',
    waitTime: '10 min',
    isAvailable: true,
    coordinates: { lat: 40.720, lng: -74.008 }
  },
  {
    id: '5',
    name: 'Electron Depot',
    location: 'South Boulevard',
    distance: '4.5 miles',
    availablePorts: 2,
    totalPorts: 6,
    chargingSpeed: '100 kW',
    waitTime: '20 min',
    isAvailable: true,
    coordinates: { lat: 40.710, lng: -74.015 }
  }
];

const StationMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    onlyAvailable: true,
    minPower: 50,
    maxDistance: 10
  });
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  
  const filteredStations = allStations.filter(station => {
    // Filter by availability if needed
    if (filters.onlyAvailable && !station.isAvailable) return false;
    
    // Filter by charging power
    const power = parseInt(station.chargingSpeed.split(' ')[0]);
    if (power < filters.minPower) return false;
    
    // Filter by distance
    const distance = parseFloat(station.distance.split(' ')[0]);
    if (distance > filters.maxDistance) return false;
    
    // Filter by search query
    if (searchQuery && !station.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !station.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen bg-ev-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold">Find Charging Stations</h1>
          <p className="text-ev-text-light mt-1">
            Locate nearby charging stations and plan your route.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters & Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="card-ev">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="input-ev pl-9 w-full"
                  placeholder="Search stations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mt-4">
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-ev-accent" />
                    <span className="font-medium">Filters</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="mt-3 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-ev-text-light">Show Available Only</label>
                        <button
                          className={`w-10 h-5 rounded-full transition-colors relative ${filters.onlyAvailable ? 'bg-ev-accent' : 'bg-gray-200'}`}
                          onClick={() => setFilters({...filters, onlyAvailable: !filters.onlyAvailable})}
                        >
                          <span 
                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${filters.onlyAvailable ? 'translate-x-5' : ''}`}
                          ></span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-ev-text-light block mb-2">
                        Minimum Charging Power: {filters.minPower} kW
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="350" 
                        step="50"
                        value={filters.minPower}
                        onChange={(e) => setFilters({...filters, minPower: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ev-accent"
                      />
                      <div className="flex justify-between text-xs text-ev-text-light mt-1">
                        <span>0 kW</span>
                        <span>350 kW</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-ev-text-light block mb-2">
                        Maximum Distance: {filters.maxDistance} miles
                      </label>
                      <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        value={filters.maxDistance}
                        onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ev-accent"
                      />
                      <div className="flex justify-between text-xs text-ev-text-light mt-1">
                        <span>1 mile</span>
                        <span>20 miles</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <Button 
                        onClick={() => setFilters({onlyAvailable: true, minPower: 50, maxDistance: 10})}
                        variant="outline" 
                        size="sm" 
                        className="text-ev-text-light"
                      >
                        Reset
                      </Button>
                      <Button size="sm" className="btn-ev">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="space-y-4">
              {filteredStations.map((station, index) => (
                <ChargingCard 
                  key={station.id} 
                  station={station}
                  className={`animate-scale-in ${selectedStation === station.id ? 'border-ev-accent' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedStation(station.id)}
                />
              ))}
              
              {filteredStations.length === 0 && (
                <Card className="card-ev py-8 text-center">
                  <div className="flex flex-col items-center">
                    <Search className="h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-ev-text-light">No stations match your criteria</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({onlyAvailable: false, minPower: 0, maxDistance: 20});
                      }}
                      variant="link" 
                      className="mt-2 text-ev-accent"
                    >
                      Clear filters
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </motion.div>
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="card-ev h-[600px] relative overflow-hidden">
              {/* Map Placeholder - In a real app, you would integrate Google Maps or similar */}
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-ev-text-light">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-ev-accent" />
                  <p className="text-lg">Interactive Map</p>
                  <p className="max-w-xs mx-auto text-sm mt-2">
                    This would be an interactive map showing charging stations in a real application.
                  </p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-105">
                  <Plus className="h-5 w-5 text-ev-text" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-105">
                  <Minus className="h-5 w-5 text-ev-text" />
                </button>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <button className="w-12 h-12 bg-ev-accent rounded-full shadow-md flex items-center justify-center text-white transition-transform hover:scale-105">
                  <Navigation className="h-6 w-6" />
                </button>
              </div>
              
              {/* Route Planning Panel - Shown when a station is selected */}
              {selectedStation && (
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 animate-slide-up">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Plan Your Route</h3>
                      <p className="text-ev-text-light text-sm">
                        {allStations.find(s => s.id === selectedStation)?.name}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedStation(null)}
                      className="text-ev-text-light hover:text-ev-text"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <Button variant="outline" className="flex-1 flex items-center justify-center">
                      <Compass className="h-4 w-4 mr-2" />
                      <span>Directions</span>
                    </Button>
                    <Button className="flex-1 btn-ev flex items-center justify-center">
                      <Zap className="h-4 w-4 mr-2" />
                      <span>Navigate</span>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Fix for the missing icons in the map controls
const Plus = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Minus = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default StationMap;
