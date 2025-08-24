import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Clock, Wrench, Filter, Navigation } from "lucide-react";

interface Mechanic {
  id: number;
  name: string;
  distance: number; // in km
  rating: number;
  specialization: string;
  responseTime: string;
  phone: string;
  availability: "Available" | "Busy" | "Closed";
  services: string[];
  price: "₹" | "₹₹" | "₹₹₹";
  experience: number; // years
  image: string;
}

interface MechanicsListProps {
  userLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const MechanicsList = ({ userLocation }: MechanicsListProps) => {
  const [sortBy, setSortBy] = useState<string>("distance");
  const [filterByAvailability, setFilterByAvailability] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(5);

  const allMechanics: Mechanic[] = [
    {
      id: 1,
      name: "Mike's Auto Repair",
      distance: 0.8,
      rating: 4.8,
      specialization: "Engine & Transmission",
      responseTime: "10-15 min",
      phone: "+1 234-567-8901",
      availability: "Available",
      services: ["Engine Repair", "Transmission", "Oil Change"],
      price: "₹₹",
      experience: 12,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Highway Heroes Service",
      distance: 1.2,
      rating: 4.9,
      specialization: "Emergency Roadside",
      responseTime: "5-10 min",
      phone: "+1 234-567-8902",
      availability: "Available",
      services: ["Towing", "Jump Start", "Tire Change", "Lockout"],
      price: "₹₹₹",
      experience: 8,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Pro-Tech Motors",
      distance: 2.1,
      rating: 4.7,
      specialization: "Electrical & Diagnostics",
      responseTime: "15-20 min",
      phone: "+1 234-567-8903",
      availability: "Busy",
      services: ["Electrical", "Computer Diagnostics", "AC Repair"],
      price: "₹₹₹",
      experience: 15,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Quick Fix Garage",
      distance: 2.8,
      rating: 4.5,
      specialization: "General Repairs",
      responseTime: "20-25 min",
      phone: "+1 234-567-8904",
      availability: "Available",
      services: ["Brake Repair", "Suspension", "General Maintenance"],
      price: "₹",
      experience: 6,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Elite Auto Service",
      distance: 3.5,
      rating: 4.6,
      specialization: "Luxury Vehicles",
      responseTime: "30-40 min",
      phone: "+1 234-567-8905",
      availability: "Available",
      services: ["BMW", "Mercedes", "Audi", "Premium Service"],
      price: "₹₹₹",
      experience: 20,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "24/7 Mobile Mechanic",
      distance: 4.2,
      rating: 4.4,
      specialization: "Mobile Service",
      responseTime: "25-35 min",
      phone: "+1 234-567-8906",
      availability: "Available",
      services: ["On-site Repair", "Emergency Service", "Mobile Diagnostics"],
      price: "₹₹",
      experience: 10,
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Speedy Repairs",
      distance: 4.8,
      rating: 4.3,
      specialization: "Fast Service",
      responseTime: "15-20 min",
      phone: "+1 234-567-8907",
      availability: "Closed",
      services: ["Quick Fixes", "Basic Maintenance", "Tire Service"],
      price: "₹",
      experience: 5,
      image: "/placeholder.svg"
    }
  ];

  const filteredAndSortedMechanics = useMemo(() => {
    let filtered = allMechanics.filter(mechanic => {
      const withinDistance = mechanic.distance <= maxDistance;
      const availabilityMatch = filterByAvailability === "all" || 
                               mechanic.availability.toLowerCase() === filterByAvailability;
      return withinDistance && availabilityMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance;
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "responseTime":
          return parseInt(a.responseTime) - parseInt(b.responseTime);
        default:
          return 0;
      }
    });
  }, [sortBy, filterByAvailability, maxDistance]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-success/20 text-success border-success/30";
      case "Busy":
        return "bg-warning/20 text-warning border-warning/30";
      case "Closed":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {userLocation && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Tracking Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing mechanics near: {userLocation.address}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Sort
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Distance</label>
              <Select value={maxDistance.toString()} onValueChange={(value) => setMaxDistance(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Within 3 km</SelectItem>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Select value={filterByAvailability} onValueChange={setFilterByAvailability}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available Only</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="responseTime">Response Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-muted-foreground">
                {filteredAndSortedMechanics.length} mechanics found
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mechanics List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedMechanics.map((mechanic) => (
          <Card key={mechanic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {mechanic.distance} km away
                  </CardDescription>
                </div>
                <Badge className={getAvailabilityColor(mechanic.availability)}>
                  {mechanic.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mechanic.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({mechanic.experience}y exp)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg">{mechanic.price}</span>
                  </div>
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

                <div className="flex flex-wrap gap-1">
                  {mechanic.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {mechanic.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mechanic.services.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={mechanic.availability === "Closed"}
                  >
                    Request Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedMechanics.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mechanics found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or increasing the search distance.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MechanicsList;