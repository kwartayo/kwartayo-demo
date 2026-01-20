'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { Heart, Filter, Trash2, Share2 } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'price' | 'rating'>('recent');

  // Mock saved properties
  const savedProperties = [
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
      savedAt: '2024-01-20',
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
      savedAt: '2024-01-18',
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
      savedAt: '2024-01-15',
    },
  ];

  // Set initial favorites
  const setInitialFavorites = () => {
    setFavorites(savedProperties.map((p) => p.id));
  };

  useEffect(() => {
    setInitialFavorites();
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'seeker') {
      router.push('/auth/login?role=seeker');
    }
  }, [user, router]);

  if (!user || user.role !== 'seeker') {
    return null;
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const sortedProperties = [...savedProperties].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });

  const filteredProperties = sortedProperties.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Heart className="w-8 h-8 fill-primary text-primary" />
              Saved Properties
            </h1>
            <p className="text-muted-foreground">
              You have {filteredProperties.length} saved properties
            </p>
          </div>

          <Link
            href="/recommendations"
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm"
          >
            Explore More
          </Link>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-muted transition text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
          >
            <option value="recent">Recently Saved</option>
            <option value="price">Price: Low to High</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProperties.map((property) => (
              <div key={property.id} className="relative group">
                <PropertyCard
                  {...property}
                  isFavorited={favorites.includes(property.id)}
                  onFavoriteToggle={() => toggleFavorite(property.id)}
                />

                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No saved properties yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save your favorite properties to this list
            </p>
            <Link
              href="/recommendations"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Browse Properties
            </Link>
          </div>
        )}

        {/* Comparison Section */}
        {filteredProperties.length > 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Compare Properties</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Rooms
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.slice(0, 5).map((property) => (
                    <tr key={property.id} className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {property.title}
                      </td>
                      <td className="px-4 py-3 font-bold text-primary">
                        ₱{property.price.toLocaleString()}/mo
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {property.beds}/{property.baths}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          ⭐ {property.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {property.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
