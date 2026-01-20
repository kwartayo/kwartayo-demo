'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { Building2, Users, Eye, Heart, TrendingUp, Plus } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  // Mock data for owner
  const ownerStats = {
    listings: 8,
    views: 342,
    favorites: 47,
    inquiries: 12,
  };

  // Mock data for seeker
  const seekerStats = {
    saved: 12,
    viewed: 45,
    favorites: 8,
    applications: 3,
  };

  const myListings = [
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
  ];

  const savedListings = [
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
  ];

  const isOwner = user.role === 'owner';

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {isOwner
              ? 'Manage your property listings and track inquiries'
              : 'Find your perfect room and connect with property owners'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {isOwner ? (
            <>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-foreground">{ownerStats.listings}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-8 h-8 text-accent" />
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    This Month
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-foreground">{ownerStats.views}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Favorited</p>
                <p className="text-3xl font-bold text-foreground">{ownerStats.favorites}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{ownerStats.inquiries}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Saved Properties</p>
                <p className="text-3xl font-bold text-foreground">{seekerStats.saved}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Viewed</p>
                <p className="text-3xl font-bold text-foreground">{seekerStats.viewed}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Favorites</p>
                <p className="text-3xl font-bold text-foreground">{seekerStats.favorites}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">Applications</p>
                <p className="text-3xl font-bold text-foreground">{seekerStats.applications}</p>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        {isOwner ? (
          <>
            {/* Owner Content */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Listings</h2>
              <Link
                href="/listings/create"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                <Plus className="w-4 h-4" />
                New Listing
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {myListings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  {...listing}
                  isFavorited={false}
                  onFavoriteToggle={() => {}}
                />
              ))}
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Recent Inquiries</h2>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">Inquiry #{i + 1}</p>
                      <p className="text-sm text-muted-foreground">From property seeker</p>
                    </div>
                    <button className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Seeker Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Your Saved Properties</h2>
              <p className="text-muted-foreground">Properties you bookmarked for later</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {savedListings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  {...listing}
                  isFavorited={true}
                  onFavoriteToggle={() => {}}
                />
              ))}
            </div>

            {/* Browse More */}
            <div className="bg-gradient-to-br from-primary to-primary/60 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to explore more?</h3>
              <p className="mb-6 text-white/90">Discover more properties that match your preferences</p>
              <Link
                href="/"
                className="inline-block px-6 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition font-semibold"
              >
                Browse Properties
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
