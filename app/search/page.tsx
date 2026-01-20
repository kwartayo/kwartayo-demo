'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { X, MapPin, DollarSign, Home, Sliders, List, Grid } from 'lucide-react';
import { Suspense } from 'react';

export default function SearchPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 3000,
    maxPrice: 30000,
    bedrooms: [],
    bathrooms: [],
    amenities: [],
    sortBy: 'recent' as 'recent' | 'price' | 'rating',
  });

  const allProperties = [
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
      ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
      verified: true,
      badge: null,
      rating: 4.8,
      reviews: 20,
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setFilters({
      location: searchParams.get('location') || '',
      minPrice: parseInt(searchParams.get('minPrice') || '3000'),
      maxPrice: parseInt(searchParams.get('maxPrice') || '30000'),
      bedrooms: (searchParams.get('bedrooms') || '').split(',').filter(Boolean),
      bathrooms: (searchParams.get('bathrooms') || '').split(',').filter(Boolean),
      amenities: (searchParams.get('amenities') || '').split(',').filter(Boolean),
      sortBy: (searchParams.get('sort') || 'recent') as 'recent' | 'price' | 'rating',
    });
  }, []);

  let filtered = allProperties.filter((p) => {
    if (filters.location && p.location !== filters.location) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.bedrooms.length && !filters.bedrooms.includes(p.beds.toString())) return false;
    if (filters.bathrooms.length && !filters.bathrooms.includes(p.baths.toString())) return false;
    if (
      filters.amenities.length &&
      !filters.amenities.every((a) => p.amenities.includes(a))
    ) {
      return false;
    }
    return true;
  });

  if (filters.sortBy === 'price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const locations = [
    'Quezon City',
    'Makati',
    'Manila',
    'Pasig',
    'Taguig',
    'Muntinlupa',
    'Cavite',
    'Laguna',
  ];

  const amenitiesOptions = [
    'WiFi',
    'AC',
    'Kitchen',
    'Parking',
    'Laundry',
    'Security',
    'Gym',
    'Pool',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user?.role || null} setUserRole={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="font-bold text-foreground">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h3>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Min: ₱{filters.minPrice.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="3000"
                        max={filters.maxPrice}
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            minPrice: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Max: ₱{filters.maxPrice.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min={filters.minPrice}
                        max="30000"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            maxPrice: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Bedrooms
                  </h3>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((n) => (
                      <label key={n} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.bedrooms.includes(n.toString())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                bedrooms: [...filters.bedrooms, n.toString()],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                bedrooms: filters.bedrooms.filter(
                                  (b) => b !== n.toString()
                                ),
                              });
                            }
                          }}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground">{n} Bedroom{n > 1 ? 's' : ''}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
                  <div className="space-y-2">
                    {amenitiesOptions.slice(0, 4).map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                amenities: [...filters.amenities, amenity],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                amenities: filters.amenities.filter(
                                  (a) => a !== amenity
                                ),
                              });
                            }
                          }}
                          className="accent-primary"
                        />
                        <span className="text-sm text-foreground">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() =>
                    setFilters({
                      location: '',
                      minPrice: 3000,
                      maxPrice: 30000,
                      bedrooms: [],
                      bathrooms: [],
                      amenities: [],
                      sortBy: 'recent',
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Properties Found
                </h1>
                <p className="text-muted-foreground">
                  {filtered.length} properties match your search
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  <Sliders className="w-4 h-4" />
                  Filters
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sortBy: e.target.value as any,
                    })
                  }
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                >
                  <option value="recent">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex gap-2 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-muted'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-muted'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filtered.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    isFavorited={favorites.includes(property.id)}
                    onFavoriteToggle={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-2xl font-bold text-foreground mb-2">
                  No properties found
                </p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      location: '',
                      minPrice: 3000,
                      maxPrice: 30000,
                      bedrooms: [],
                      bathrooms: [],
                      amenities: [],
                      sortBy: 'recent',
                    })
                  }
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Loading() {
  return null;
}

export { Loading };
