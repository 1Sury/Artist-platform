"use client";
export const dynamic = 'force-dynamic';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Music, Mic2, Users, Headphones, Star, MapPin, Clock, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import { useState } from "react";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    {
      id: 1,
      name: "Singers",
      icon: Mic2,
      count: "150+ Artists",
      description: "Professional vocalists for any event",
      color: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      id: 2,
      name: "Dancers",
      icon: Users,
      count: "200+ Artists",
      description: "From classical to contemporary styles",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      name: "DJs",
      icon: Headphones,
      count: "100+ Artists",
      description: "Keep the party going all night long",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      id: 4,
      name: "Speakers",
      icon: Music,
      count: "80+ Artists",
      description: "Motivational and keynote speakers",
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    }
  ];

  const featuredArtists = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Singer",
      rating: 4.9,
      reviews: 127,
      location: "Mumbai",
      price: "₹15,000 - ₹25,000",
      image: "https://images.unsplash.com/photo-1494790108755-2616c4b9f81c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      category: "DJ",
      rating: 4.8,
      reviews: 89,
      location: "Delhi",
      price: "₹20,000 - ₹35,000",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Priya Sharma",
      category: "Dancer",
      rating: 4.9,
      reviews: 156,
      location: "Bangalore",
      price: "₹12,000 - ₹22,000",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Artistly</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/artists" className="text-muted-foreground hover:text-primary transition-colors">Browse Artists</Link>
              <Link href="/onboard" className="text-muted-foreground hover:text-primary transition-colors">Join as Artist</Link>
              <Link href="/login?type=manager" className="text-muted-foreground hover:text-primary transition-colors">Manager Login</Link>
            </div>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/onboard">Join as Artist</Link>
              </Button>
              <Button asChild>
                <Link href="/artists">Browse Artists</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t">
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/artists" 
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Artists
                </Link>
                <Link 
                  href="/onboard" 
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join as Artist
                </Link>
                <Link 
                  href="/login?type=manager" 
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manager Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Find Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                Performing Artists
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with talented singers, dancers, DJs, and speakers for your events. 
              Book verified professionals with transparent pricing and instant availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/artists">Explore Artists</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/onboard">Join as Artist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover talented artists across different performance categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`${category.color} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-5 translate-x-5"></div>
                      <IconComponent className="h-12 w-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 text-sm mb-1">{category.count}</p>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Artists
            </h2>
            <p className="text-lg text-muted-foreground">
              Top-rated performers ready for your next event
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    
<Image
  src={artist.image}
  alt={artist.name}
  width={64}
  height={64}
  className="w-16 h-16 rounded-full object-cover"
/>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{artist.name}</h3>
                      <p className="text-primary font-medium">{artist.category}</p>
                    </div>
                  </div>
                  
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
                  
                  <Button className="w-full" variant="outline">
                    Ask for Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/artists">View All Artists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Perfect Artist?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/artists">Browse Artists</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/onboard">Join as Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold">Artistly</span>
              </div>
              <p className="text-gray-400">
                Connecting event planners with talented performing artists across India.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Event Planners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/artists" className="hover:text-white transition-colors">Browse Artists</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Artists</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/onboard" className="hover:text-white transition-colors">Join Artistly</Link></li>
                <li><Link href="/login?type=manager" className="hover:text-white transition-colors">Manager Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Artistly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}