
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BatteryCharging, 
  Zap, 
  MapPin, 
  BarChart3,
  Leaf,
  Calendar,
  ArrowRight
} from 'lucide-react';
import ChargingCard from '@/components/ChargingCard';
import Navbar from '@/components/Navbar';

// Sample data
const nearbyStations = [
  {
    id: '1',
    name: 'EcoCharge Station',
    location: 'Downtown',
    distance: '0.8 miles',
    availablePorts: 4,
    totalPorts: 6,
    chargingSpeed: '150 kW',
    waitTime: '5 min',
    isAvailable: true
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
    isAvailable: true
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
    isAvailable: false
  }
];

const Dashboard = () => {
  const [batteryLevel, setBatteryLevel] = useState(72);
  const [estimatedRange, setEstimatedRange] = useState(215);
  const [isCharging, setIsCharging] = useState(false);
  
  // Simulate charging
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCharging && batteryLevel < 100) {
      interval = setInterval(() => {
        setBatteryLevel(prev => {
          const newLevel = Math.min(prev + 1, 100);
          setEstimatedRange(Math.round(newLevel * 3));
          if (newLevel >= 100) {
            setIsCharging(false);
          }
          return newLevel;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCharging, batteryLevel]);
  
  const getBatteryColor = () => {
    if (batteryLevel >= 60) return 'text-green-500';
    if (batteryLevel >= 30) return 'text-amber-500';
    return 'text-red-500';
  };
  
  return (
    <div className="min-h-screen bg-ev-background pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold">EV Dashboard</h1>
          <p className="text-ev-text-light mt-1">
            Monitor your vehicle status and find nearby charging stations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battery Status Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="card-ev overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Battery Status</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsCharging(!isCharging)}
                  className={isCharging ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-200" : ""}
                >
                  {isCharging ? "Stop Charging" : "Start Charging"}
                </Button>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Battery indicator circle */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      className="stroke-gray-100 fill-none" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      className={`${getBatteryColor()} fill-none transition-all duration-1000 ease-in-out`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${batteryLevel * 2.83} 283`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-3xl font-bold ${getBatteryColor()}`}>
                      {batteryLevel}%
                    </span>
                    {isCharging && (
                      <div className="flex items-center text-ev-accent mt-1">
                        <Zap className="h-4 w-4 mr-1 animate-pulse" />
                        <span className="text-xs font-medium">Charging</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-ev-text-light text-xs mb-1">Remaining Range</div>
                  <div className="text-xl font-semibold">{estimatedRange} <span className="text-sm">mi</span></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-ev-text-light text-xs mb-1">Energy Efficiency</div>
                  <div className="text-xl font-semibold">4.1 <span className="text-sm">mi/kWh</span></div>
                </div>
              </div>
            </Card>
            
            <Card className="card-ev">
              <h2 className="text-lg font-medium mb-4">Energy Savings</h2>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-ev-text-light text-xs mb-1">CO₂ Saved</div>
                  <div className="flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-1.5" />
                    <span className="text-xl font-semibold">384 <span className="text-sm">kg</span></span>
                  </div>
                </div>
                <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-ev-text-light text-xs mb-1">Cost Saved</div>
                  <div className="text-xl font-semibold">$145</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ev-text-light">View detailed statistics</span>
                <Button size="sm" variant="ghost" className="p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
          
          {/* Nearby Stations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Nearby Charging Stations</h2>
              <Button variant="outline" size="sm" className="text-ev-accent">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyStations.map((station, index) => (
                <ChargingCard 
                  key={station.id} 
                  station={station} 
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
            
            <Card className="card-ev">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Weekly Activity</h2>
                <Button size="sm" variant="ghost" className="text-ev-accent">
                  <Calendar className="h-4 w-4 mr-1.5" /> 
                  <span>This Week</span>
                </Button>
              </div>
              
              <div className="h-40 flex items-end justify-between px-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const height = Math.random() * 80 + 20;
                  const today = index === new Date().getDay() - 1 || (index === 6 && new Date().getDay() === 0);
                  
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className={`w-8 rounded-t-md ${today ? 'bg-ev-accent' : 'bg-gray-200'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className={`mt-2 text-xs ${today ? 'font-medium text-ev-accent' : 'text-ev-text-light'}`}>
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-ev-text-light text-xs">Total Energy</div>
                  <div className="font-medium">85.7 kWh</div>
                </div>
                <div>
                  <div className="text-ev-text-light text-xs">Charging Sessions</div>
                  <div className="font-medium">7 sessions</div>
                </div>
                <div>
                  <div className="text-ev-text-light text-xs">Average Cost</div>
                  <div className="font-medium">$0.13 / kWh</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
