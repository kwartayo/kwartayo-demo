'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { Zap, Heart } from 'lucide-react';

export default function RecommendationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'seeker') {
      router.push('/auth/login?role=seeker');
    }
  }, [user, router]);

  if (!user || user.role !== 'seeker') {
    return null;
  }

  // Mock recommendations with match scores
  const recommendations = [
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
      matchScore: 98,
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
      matchScore: 87,
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
      matchScore: 92,
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
      matchScore: 75,
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
      matchScore: 94,
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
      ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      verified: true,
      badge: null,
      rating: 4.8,
      reviews: 20,
      matchScore: 86,
    },
  ];

  // Sort by match score
  const sortedRecommendations = [...recommendations].sort(
    (a, b) => b.matchScore - a.matchScore
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">
              Recommended for You
            </h1>
            <Link
              href="/preferences"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm"
            >
              Edit Preferences
            </Link>
          </div>
          <p className="text-muted-foreground">
            Properties matched to your preferences, sorted by compatibility
          </p>
        </div>

        {/* Match Score Legend */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
            <p className="text-muted-foreground text-sm mb-1">Perfect Match</p>
            <p className="text-2xl font-bold text-primary">95-100%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-accent">
            <p className="text-muted-foreground text-sm mb-1">Good Match</p>
            <p className="text-2xl font-bold text-accent">85-94%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
            <p className="text-muted-foreground text-sm mb-1">Decent Match</p>
            <p className="text-2xl font-bold text-yellow-500">70-84%</p>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          {sortedRecommendations.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="flex gap-6 p-6">
                {/* Image */}
                <div className="relative flex-shrink-0 w-48 h-48">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {property.badge && (
                    <div className="absolute top-2 left-2 px-3 py-1 bg-primary text-white text-xs font-bold rounded">
                      {property.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {property.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {property.location}
                      </p>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-lg font-bold text-white ${
                          property.matchScore >= 95
                            ? 'bg-primary'
                            : property.matchScore >= 85
                              ? 'bg-accent'
                              : 'bg-yellow-500'
                        }`}
                      >
                        <Zap className="w-4 h-4 inline mr-1" />
                        {property.matchScore}%
                      </div>

                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="p-3 hover:bg-muted rounded-lg transition"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            favorites.includes(property.id)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Price</p>
                      <p className="font-bold text-primary">
                        ₱{property.price.toLocaleString()}/mo
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Rooms</p>
                      <p className="font-bold text-foreground">
                        {property.beds} bd / {property.baths} ba
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Rating</p>
                      <p className="font-bold text-foreground">
                        ⭐ {property.rating} ({property.reviews})
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Amenities</p>
                      <p className="font-bold text-foreground">
                        {property.amenities[0]} + {property.amenities.length - 1}
                      </p>
                    </div>
                  </div>

                  {/* Owner & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.ownerImage || "/placeholder.svg"}
                        alt={property.owner}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {property.owner}
                        </p>
                        {property.verified && (
                          <p className="text-xs text-primary">✓ Verified</p>
                        )}
                      </div>
                    </div>

                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/60 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want better matches?</h2>
          <p className="mb-6 text-white/90">
            Update your preferences to see properties that match your needs even better
          </p>
          <Link
            href="/preferences"
            className="inline-block px-6 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition font-semibold"
          >
            Update My Preferences
          </Link>
        </div>
      </main>
    </div>
  );
}
