import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Wrench, Clock, Star, Phone } from "lucide-react";

const Index = () => {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const featuredMechanics = [
    {
      id: 1,
      name: "Mike's Auto Repair",
      distance: "0.8 km",
      rating: 4.8,
      specialization: "Engine & Transmission",
      responseTime: "10-15 min",
      phone: "+1 234-567-8901",
      availability: "Available",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Highway Heroes Service",
      distance: "1.2 km",
      rating: 4.9,
      specialization: "Emergency Roadside",
      responseTime: "5-10 min",
      phone: "+1 234-567-8902",
      availability: "Available",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Pro-Tech Motors",
      distance: "2.1 km",
      rating: 4.7,
      specialization: "Electrical & Diagnostics",
      responseTime: "15-20 min",
      phone: "+1 234-567-8903",
      availability: "Busy",
      image: "/placeholder.svg"
    }
  ];

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

      {/* Nearby Mechanics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Mechanics Near You
            </h2>
            <p className="text-muted-foreground">
              Verified professionals ready to help with your vehicle issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMechanics.map((mechanic) => (
              <Card key={mechanic.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {mechanic.distance} away
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mechanic.availability === 'Available' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {mechanic.availability}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mechanic.rating}</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary" />
                      <span className="text-sm">{mechanic.specialization}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Response: {mechanic.responseTime}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="flex-1">
                        Request Service
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
              <p className="text-muted-foreground">
                Find the closest mechanics to your exact location for fastest service
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