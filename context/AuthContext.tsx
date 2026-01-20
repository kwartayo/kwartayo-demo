'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'seeker';
  avatar: string;
  verificationTier: 'unverified' | 'basic' | 'premium';
  bio?: string;
  phone?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'owner' | 'seeker') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'owner' | 'seeker') => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = {
  'owner@test.com': {
    id: '1',
    email: 'owner@test.com',
    name: 'Maria Santos',
    role: 'owner' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    verificationTier: 'premium' as const,
    bio: 'Property manager with 5+ years experience',
    phone: '+63 9123456789',
    location: 'Quezon City',
    rating: 4.8,
    reviews: 12,
    createdAt: new Date('2023-01-15').toISOString(),
  },
  'seeker@test.com': {
    id: '2',
    email: 'seeker@test.com',
    name: 'Juan Dela Cruz',
    role: 'seeker' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verificationTier: 'basic' as const,
    bio: 'Looking for a cozy room near UP Diliman',
    phone: '+63 9087654321',
    location: 'Quezon City',
    rating: 4.5,
    reviews: 3,
    createdAt: new Date('2024-01-10').toISOString(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('kwartayo_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('kwartayo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'owner' | 'seeker') => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock authentication
      const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
      if (mockUser && mockUser.role === role) {
        const userData = { ...mockUser };
        setUser(userData);
        localStorage.setItem('kwartayo_user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: 'owner' | 'seeker'
  ) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        verificationTier: 'unverified',
        location: '',
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('kwartayo_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kwartayo_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('kwartayo_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
