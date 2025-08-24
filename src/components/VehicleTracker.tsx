import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Car, Truck, Bike, Bus } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface VehicleTrackerProps {
  onLocationUpdate: (location: { lat: number; lng: number; address: string }) => void;
}

const VehicleTracker = ({ onLocationUpdate }: VehicleTrackerProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number; address: string} | null>(null);

  const vehicles: Vehicle[] = [
    { id: "car-1", name: "My Honda Civic", type: "Car", icon: <Car className="h-4 w-4" /> },
    { id: "truck-1", name: "Delivery Truck", type: "Truck", icon: <Truck className="h-4 w-4" /> },
    { id: "bike-1", name: "Royal Enfield", type: "Motorcycle", icon: <Bike className="h-4 w-4" /> },
    { id: "bus-1", name: "Tourist Bus", type: "Bus", icon: <Bus className="h-4 w-4" /> },
  ];

  const getCurrentLocation = () => {
    setIsTracking(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          };
          setCurrentLocation(location);
          onLocationUpdate(location);
          setIsTracking(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to mock location for demo
          const mockLocation = {
            lat: 40.7128,
            lng: -74.0060,
            address: "New York, NY (Demo Location)"
          };
          setCurrentLocation(mockLocation);
          onLocationUpdate(mockLocation);
          setIsTracking(false);
        }
      );
    } else {
      // Fallback to mock location
      const mockLocation = {
        lat: 40.7128,
        lng: -74.0060,
        address: "New York, NY (Demo Location)"
      };
      setCurrentLocation(mockLocation);
      onLocationUpdate(mockLocation);
      setIsTracking(false);
    }
  };

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Vehicle Tracking
        </CardTitle>
        <CardDescription>
          Select your vehicle and track its location to find nearby mechanics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Vehicle</label>
          <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  <div className="flex items-center gap-2">
                    {vehicle.icon}
                    <span>{vehicle.name}</span>
                    <span className="text-xs text-muted-foreground">({vehicle.type})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedVehicle && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              {selectedVehicleData?.icon}
              <div>
                <p className="font-medium">{selectedVehicleData?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedVehicleData?.type}</p>
              </div>
            </div>

            <Button 
              onClick={getCurrentLocation} 
              disabled={isTracking}
              className="w-full"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {isTracking ? "Getting Location..." : "Track Current Location"}
            </Button>

            {currentLocation && (
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">Location Found</span>
                </div>
                <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleTracker;