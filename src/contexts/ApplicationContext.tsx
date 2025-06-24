"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ArtistApplication {
  id: number;
  name: string;
  category: string;
  city: string;
  fee: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  languages: string[];
  rating: number | null;
  email?: string;
  bio?: string;
  profileImage?: string;
}

interface ApplicationContextType {
  applications: ArtistApplication[];
  addApplication: (application: Omit<ArtistApplication, 'id' | 'submittedDate' | 'status' | 'rating'>) => void;
  updateApplicationStatus: (id: number, status: 'approved' | 'rejected') => void;
  getApplicationById: (id: number) => ArtistApplication | undefined;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

// Initial mock applications
const initialApplications: ArtistApplication[] = [
  {
    id: 1,
    name: "Ravi Kumar",
    category: "Singer",
    city: "Mumbai",
    fee: "₹15,000 - ₹25,000",
    submittedDate: "2024-06-20",
    status: "pending",
    languages: ["Hindi", "English"],
    rating: null,
    email: "ravi@example.com",
    bio: "Professional playback singer with 5 years of experience"
  },
  {
    id: 2,
    name: "Sneha Patel",
    category: "Dancer",
    city: "Ahmedabad",
    fee: "₹12,000 - ₹20,000",
    submittedDate: "2024-06-19",
    status: "approved",
    languages: ["Hindi", "Gujarati"],
    rating: 4.8,
    email: "sneha@example.com",
    bio: "Classical and contemporary dance specialist"
  },
  {
    id: 3,
    name: "DJ Akash",
    category: "DJ",
    city: "Bangalore",
    fee: "₹20,000 - ₹35,000",
    submittedDate: "2024-06-18",
    status: "approved",
    languages: ["English", "Hindi", "Kannada"],
    rating: 4.6,
    email: "akash@example.com",
    bio: "Electronic music DJ with club and wedding experience"
  },
  {
    id: 4,
    name: "Meera Sharma",
    category: "Speaker",
    city: "Delhi",
    fee: "₹25,000 - ₹40,000",
    submittedDate: "2024-06-17",
    status: "rejected",
    languages: ["English", "Hindi"],
    rating: null,
    email: "meera@example.com",
    bio: "Motivational speaker and corporate trainer"
  }
];

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<ArtistApplication[]>(initialApplications);

  const addApplication = (newApplication: Omit<ArtistApplication, 'id' | 'submittedDate' | 'status' | 'rating'>) => {
    const application: ArtistApplication = {
      ...newApplication,
      id: Math.max(...applications.map(a => a.id), 0) + 1,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      rating: null
    };
    setApplications(prev => [application, ...prev]);
  };

  const updateApplicationStatus = (id: number, status: 'approved' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status, rating: status === 'approved' ? 4.5 : null }
          : app
      )
    );
  };

  const getApplicationById = (id: number) => {
    return applications.find(app => app.id === id);
  };

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      addApplication, 
      updateApplicationStatus,
      getApplicationById 
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};