"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Music, Search, Filter, Star, MapPin, Clock, ArrowLeft } from "lucide-react";

export default function Artists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  // Mock artist data
  const artists = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Singer",
      rating: 4.9,
      reviews: 127,
      location: "Mumbai",
      priceRange: "15k-25k",
      price: "₹15,000 - ₹25,000",
      specialties: ["Jazz", "Pop", "Classical"],
      image: "https://images.unsplash.com/photo-1494790108755-2616c4b9f81c?w=200&h=200&fit=crop&crop=face",
      bio: "Professional vocalist with 10+ years of experience in live performances and studio recordings."
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      category: "DJ",
      rating: 4.8,
      reviews: 89,
      location: "Delhi",
      priceRange: "20k-35k",
      price: "₹20,000 - ₹35,000",
      specialties: ["Electronic", "Bollywood", "Wedding"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Award-winning DJ specializing in weddings and corporate events with premium sound equipment."
    },
    {
      id: 3,
      name: "Priya Sharma",
      category: "Dancer",
      rating: 4.9,
      reviews: 156,
      location: "Bangalore",
      priceRange: "12k-22k",
      price: "₹12,000 - ₹22,000",
      specialties: ["Classical", "Bollywood", "Contemporary"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Trained in multiple dance forms with extensive stage experience and choreography expertise."
    },
    {
      id: 4,
      name: "Michael D'Souza",
      category: "Speaker",
      rating: 4.7,
      reviews: 92,
      location: "Mumbai",
      priceRange: "25k-40k",
      price: "₹25,000 - ₹40,000",
      specialties: ["Motivation", "Corporate", "Leadership"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Renowned motivational speaker and corporate trainer with 15+ years of industry experience."
    },
    {
      id: 5,
      name: "Anita Verma",
      category: "Singer",
      rating: 4.6,
      reviews: 73,
      location: "Chennai",
      priceRange: "10k-20k",
      price: "₹10,000 - ₹20,000",
      specialties: ["Folk", "Classical", "Devotional"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      bio: "Traditional folk singer with expertise in regional music and cultural performances."
    },
    {
      id: 6,
      name: "Arjun Patel",
      category: "DJ",
      rating: 4.5,
      reviews: 64,
      location: "Pune",
      priceRange: "15k-28k",
      price: "₹15,000 - ₹28,000",
      specialties: ["House", "Techno", "Commercial"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      bio: "Young and energetic DJ bringing fresh beats to clubs and private events."
    }
  ];

  const categories = ["all", "Singer", "Dancer", "DJ", "Speaker"];
  const locations = ["all", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"];
  const priceRanges = ["all", "10k-20k", "15k-25k", "20k-35k", "25k-40k"];

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artist.specialties.some(specialty => 
                            specialty.toLowerCase().includes(searchTerm.toLowerCase())
                          );
      const matchesCategory = selectedCategory === "all" || artist.category === selectedCategory;
      const matchesLocation = selectedLocation === "all" || artist.location === selectedLocation;
      const matchesPriceRange = selectedPriceRange === "all" || artist.priceRange === selectedPriceRange;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedPriceRange]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                <Music className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">Artistly</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/artists" className="text-primary font-medium">Browse Artists</Link>
              <Link href="/onboard" className="text-muted-foreground hover:text-primary transition-colors">Join as Artist</Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          
          <p className="text-lg text-muted-foreground">
            Browse through our curated collection of professional performers
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search artists or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range === "all" ? "All Prices" : `₹${range.replace('k', ',000').replace('-', ' - ₹')}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtists.length} of {artists.length} artists
          </p>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
  src={artist.image || "/placeholder.svg"}
  alt={artist.name}
  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
/>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {artist.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-foreground mb-2">{artist.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{artist.bio}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{artist.rating}</span>
                      <span className="text-muted-foreground">({artist.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{artist.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {artist.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{artist.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="w-full">
                    Ask for Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No artists found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
                setSelectedPriceRange("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}