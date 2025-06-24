"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Music, ArrowLeft, Eye, MessageSquare, CheckCircle, Clock, Users, DollarSign, Star, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useApplications } from "@/contexts/ApplicationContext";
import { toast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import ThemeToggle from "@/components/ThemeToggle";
export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("applications");
  const { user, logout } = useAuth();
  const { applications, updateApplicationStatus } = useApplications();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    toast("Logged out successfully");
  };

  const handleApprove = (id: number, name: string) => {
    updateApplicationStatus(id, 'approved');
    toast(`${name}'s application has been approved`);
  };

  const handleReject = (id: number, name: string) => {
    updateApplicationStatus(id, 'rejected');
    toast(`${name}'s application has been rejected`);
  };

  const handleViewApplication = (id: number) => {
    toast(`Viewing application details for ID: ${id}`);
  };

  const handleSendMessage = (name: string) => {
    toast(`Opening message thread with ${name}`);
  };

  // Mock booking requests
  const bookingRequests = [
    {
      id: 1,
      eventType: "Wedding",
      clientName: "Priya & Arjun",
      artistRequested: "Sarah Johnson",
      date: "2024-07-15",
      location: "Mumbai",
      budget: "₹20,000",
      status: "pending"
    },
    {
      id: 2,
      eventType: "Corporate Event",
      clientName: "TechCorp Solutions",
      artistRequested: "DJ Akash",
      date: "2024-07-20",
      location: "Bangalore",
      budget: "₹30,000",
      status: "confirmed"
    }
  ];

  const approvedArtists = applications.filter(app => app.status === 'approved').length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;

  const stats = [
    {
      title: "Total Artists",
      value: approvedArtists.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Pending Applications",
      value: pendingApplications.toString(),
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      title: "Revenue This Month",
      value: "₹2,45,000",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-200">Rejected</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="text-green-600 border-green-200">Confirmed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute requiredRole="manager">
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="bg-card shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                  <Music className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">Artistly</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link href="/artists" className="text-muted-foreground hover:text-primary transition-colors">Browse Artists</Link>
                <Link href="/dashboard" className="text-primary font-medium">Dashboard</Link>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Manager Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage artist applications and booking requests
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`${stat.bg} p-3 rounded-full`}>
                        <IconComponent className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setSelectedTab("applications")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "applications"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  }`}
                >
                  Artist Applications ({applications.length})
                </button>
                <button
                  onClick={() => setSelectedTab("bookings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "bookings"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  }`}
                >
                  Booking Requests ({bookingRequests.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {selectedTab === "applications" && (
            <Card>
              <CardHeader>
                <CardTitle>Artist Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artist Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Fee Range</TableHead>
                        <TableHead>Languages</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.name}</TableCell>
                          <TableCell>{application.category}</TableCell>
                          <TableCell>{application.city}</TableCell>
                          <TableCell>{application.fee}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {application.languages.slice(0, 2).map((lang, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {application.languages.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{application.languages.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(application.submittedDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(application.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewApplication(application.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {application.status === "pending" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => handleApprove(application.id, application.name)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleReject(application.id, application.name)}
                                  >
                                    ✕
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "bookings" && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Artist</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.eventType}</TableCell>
                          <TableCell>{request.clientName}</TableCell>
                          <TableCell>{request.artistRequested}</TableCell>
                          <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                          <TableCell>{request.location}</TableCell>
                          <TableCell>{request.budget}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toast(`Viewing booking details for ${request.clientName}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSendMessage(request.clientName)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    asChild 
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => toast("Redirecting to artist onboarding")}
                  >
                    <Link href="/onboard">
                      <Users className="h-8 w-8" />
                      <span>Add New Artist</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => toast("Opening notification center")}
                  >
                    <MessageSquare className="h-8 w-8" />
                    <span>Send Notifications</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex-col space-y-2"
                    onClick={() => toast("Opening reports dashboard")}
                  >
                    <Eye className="h-8 w-8" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}