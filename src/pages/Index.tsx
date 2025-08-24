import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Wrench, Clock, Star, Phone } from "lucide-react";
import VehicleTracker from "@/components/VehicleTracker";
import MechanicsList from "@/components/MechanicsList";

const Index = () => {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number; address: string} | undefined>();

  const handleLocationUpdate = (newLocation: {lat: number; lng: number; address: string}) => {
    setUserLocation(newLocation);
    setLocation(newLocation.address);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Find Nearby Mechanics
              <span className="block text-primary">When You Need Them Most</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stuck on the highway? Get instant access to verified mechanics near your location. 
              Fast, reliable, and available 24/7 for emergency repairs.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter your location" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type</label>
                  <Input 
                    placeholder="Car, Truck, Motorcycle..." 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Find Mechanics
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Button */}
      <section className="py-8 bg-destructive/10">
        <div className="container mx-auto px-4 text-center">
          <Button size="lg" variant="destructive" className="animate-pulse">
            🚨 Emergency Breakdown - Get Help Now
          </Button>
        </div>
      </section>

      {/* Vehicle Tracking & Mechanics List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Vehicle Tracker Sidebar */}
            <div className="lg:col-span-1">
              <VehicleTracker onLocationUpdate={handleLocationUpdate} />
            </div>
            
            {/* Mechanics List */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Available Mechanics
                </h2>
                <p className="text-muted-foreground">
                  Choose from verified professionals within 3-5 km radius
                </p>
              </div>
              <MechanicsList userLocation={userLocation} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground">
              We connect you with the best mechanics when you need them most
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track your vehicle and find mechanics within 3-5 km radius instantly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Emergency breakdowns don't wait. Neither do our mechanics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground">
                All mechanics are verified, rated, and reviewed by real customers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;