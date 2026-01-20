'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, MapPin, Users, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PropertyCard from '@/components/PropertyCard';
import RoommateCard from '@/components/RoommateCard';
import SearchBar from '@/components/SearchBar';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HomePageContent() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userRole, setUserRole] = useState<'owner' | 'seeker' | null>(null);
  const searchParams = useSearchParams();

  const mockProperties = [
    {
      id: 1,
      title: 'Cozy Room near UP Diliman',
      location: 'Quezon City',
      price: 8500,
      beds: 1,
      baths: 1,
      amenities: ['WiFi', 'AC', 'Parking'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      owner: 'Maria Santos',
      ownerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
      verified: true,
      badge: 'UPDATED',
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 2,
      title: '2 Rooms in Share House',
      location: 'Makati',
      price: 7500,
      beds: 2,
      baths: 2,
      amenities: ['WiFi', 'Kitchen', 'Laundry'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      owner: 'John Cruz',
      ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      verified: true,
      badge: 'BOOSTED',
      rating: 4.6,
      reviews: 8,
    },
    {
      id: 3,
      title: 'Whole Property for Rent',
      location: 'Muntinlupa',
      price: 12000,
      beds: 3,
      baths: 2,
      amenities: ['WiFi', 'Parking', 'Garden'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      owner: 'Ana Garcia',
      ownerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
      verified: true,
      badge: 'NEW',
      rating: 4.9,
      reviews: 5,
    },
    {
      id: 4,
      title: 'Studio Apartment Ortigas',
      location: 'Pasig',
      price: 9500,
      beds: 1,
      baths: 1,
      amenities: ['WiFi', 'AC', 'Security'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      owner: 'Robert De Luna',
      ownerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
      verified: false,
      badge: 'UPDATED',
      rating: 4.5,
      reviews: 6,
    },
    {
      id: 5,
      title: 'Shared Room BGC',
      location: 'Taguig',
      price: 6500,
      beds: 1,
      baths: 1,
      amenities: ['WiFi', 'AC'],
      image: 'https://images.unsplash.com/photo-1516455207990-7912a373a7f7?w=400&h=300&fit=crop',
      owner: 'Patricia Reyes',
      ownerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
      verified: true,
      badge: 'BOOSTED',
      rating: 4.7,
      reviews: 15,
    },
    {
      id: 6,
      title: 'Modern Condo Unit Makati',
      location: 'Makati',
      price: 11000,
      beds: 2,
      baths: 1,
      amenities: ['WiFi', 'Gym', 'Pool'],
      image: 'https://images.unsplash.com/photo-1576356270509-b3cce4899289?w=400&h=300&fit=crop',
      owner: 'Luis Fernandez',
      ownerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
      verified: true,
      badge: null,
      rating: 4.8,
      reviews: 20,
    },
  ];

  const mockRoommates = [
    {
      id: 1,
      name: 'Alex Rivera',
      age: 24,
      gender: 'Male' as const,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      location: 'Quezon City',
      occupation: 'Software Engineer',
      budget: 8000,
      moveInDate: 'Mar 2024',
      bio: 'Looking for a quiet, clean space. Love coding and gaming on weekends.',
      interests: ['Gaming', 'Tech', 'Fitness', 'Cooking'],
      verified: true,
      rating: 4.9,
      reviews: 8,
    },
    {
      id: 2,
      name: 'Sarah Aquino',
      age: 26,
      gender: 'Female' as const,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      location: 'Makati',
      occupation: 'Marketing Manager',
      budget: 9500,
      moveInDate: 'Feb 2024',
      bio: 'Professional looking for a comfortable place near work. Quiet and respectful.',
      interests: ['Design', 'Yoga', 'Travel', 'Reading'],
      verified: true,
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 3,
      name: 'Marco Santos',
      age: 23,
      gender: 'Male' as const,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      location: 'Pasig',
      occupation: 'Student',
      budget: 6500,
      moveInDate: 'Jan 2024',
      bio: 'College student looking for affordable shared accommodation. Very friendly!',
      interests: ['Basketball', 'Movies', 'Hanging out', 'Music'],
      verified: true,
      rating: 4.7,
      reviews: 5,
    },
    {
      id: 4,
      name: 'Jessica Reyes',
      age: 27,
      gender: 'Female' as const,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      location: 'Taguig',
      occupation: 'Architect',
      budget: 10000,
      moveInDate: 'Apr 2024',
      bio: 'Creative professional seeking a modern space with good vibes and friendly roommates.',
      interests: ['Architecture', 'Art', 'Cooking', 'Exploring'],
      verified: true,
      rating: 4.9,
      reviews: 10,
    },
    {
      id: 5,
      name: 'Daniel Marcos',
      age: 25,
      gender: 'Male' as const,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      location: 'Muntinlupa',
      occupation: 'Accountant',
      budget: 7800,
      moveInDate: 'Mar 2024',
      bio: 'Organized and responsible person. Prefer clean, quiet environment with shared meals.',
      interests: ['Finance', 'Hiking', 'Podcasts', 'Volunteering'],
      verified: false,
      rating: 4.6,
      reviews: 7,
    },
    {
      id: 6,
      name: 'Lisa Gonzales',
      age: 28,
      gender: 'Female' as const,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      location: 'BGC',
      occupation: 'HR Specialist',
      budget: 9200,
      moveInDate: 'Feb 2024',
      bio: 'Friendly professional who loves meeting new people. Enjoy movie nights and dinners.',
      interests: ['Networking', 'Fitness', 'Dining', 'Travel'],
      verified: true,
      rating: 4.8,
      reviews: 14,
    },
  ];

  const [roommateFavorites, setRoommateFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const toggleRoommateFavorite = (id: number) => {
    setRoommateFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Navigation userRole={userRole} setUserRole={setUserRole} />
      </Suspense>

      {userRole === null ? (
        <HeroSection setUserRole={setUserRole} />
      ) : (
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <SearchBar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* For Owner Role - Show Properties */}
        {userRole === 'owner' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Your Listings</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                  Active
                </button>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                  Archived
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  isFavorited={favorites.includes(property.id)}
                  onFavoriteToggle={() => toggleFavorite(property.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* For Seeker Role - Show Mix of Properties & Roommates */}
        {userRole === 'seeker' && (
          <div>
            {/* Properties Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available Properties</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                    Newest
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                    Price
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    isFavorited={favorites.includes(property.id)}
                    onFavoriteToggle={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            </div>

            {/* Roommates Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Roommate</h2>
                  <p className="text-muted-foreground">Connect with like-minded people looking for accommodation in your area</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                    Newest
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">
                    Rating
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRoommates.map((roommate) => (
                  <RoommateCard
                    key={roommate.id}
                    {...roommate}
                    isFavorited={roommateFavorites.includes(roommate.id)}
                    onFavoriteToggle={() => toggleRoommateFavorite(roommate.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* For No Role - Show Introduction */}
        {!userRole && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Started with Kwartayo</h2>
            <p className="text-muted-foreground text-lg mb-8">Choose a role above to explore available properties and roommates</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
