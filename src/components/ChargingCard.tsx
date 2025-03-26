
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BatteryCharging, Zap, Clock, MapPin } from 'lucide-react';

interface ChargingCardProps {
  station: {
    id: string;
    name: string;
    location: string;
    distance: string;
    availablePorts: number;
    totalPorts: number;
    chargingSpeed: string;
    waitTime: string;
    isAvailable: boolean;
  };
  className?: string;
}

const ChargingCard: React.FC<ChargingCardProps> = ({ station, className }) => {
  const availabilityPercentage = (station.availablePorts / station.totalPorts) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage >= 50) return 'bg-green-500';
    if (availabilityPercentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Card 
      className={cn(
        "card-ev overflow-hidden hover:translate-y-[-3px] animate-scale-in",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-lg">{station.name}</h3>
          <div className="flex items-center text-ev-text-light text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{station.location}</span>
            <span className="mx-2">•</span>
            <span>{station.distance}</span>
          </div>
        </div>
        <div className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium",
          station.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
        )}>
          {station.isAvailable ? "Available" : "Busy"}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-ev-text-light">Availability</span>
          <span className="text-sm font-medium">
            {station.availablePorts}/{station.totalPorts} ports
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-500", getAvailabilityColor())}
            style={{ width: `${availabilityPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center">
          <Zap className="h-4 w-4 text-ev-accent mr-2.5" />
          <div>
            <div className="text-xs text-ev-text-light">Charging Speed</div>
            <div className="font-medium">{station.chargingSpeed}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-ev-accent mr-2.5" />
          <div>
            <div className="text-xs text-ev-text-light">Wait Time</div>
            <div className="font-medium">{station.waitTime}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChargingCard;
