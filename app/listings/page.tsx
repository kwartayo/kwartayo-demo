'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { Plus, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

export default function ListingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      router.push('/auth/login?role=owner');
    }
  }, [user, router]);

  if (!user || user.role !== 'owner') {
    return null;
  }

  // Mock listings
  const mockListings = [
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
      status: 'active',
      views: 145,
      favorites: 23,
      inquiries: 5,
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
      status: 'active',
      views: 89,
      favorites: 14,
      inquiries: 3,
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
      badge: null,
      rating: 4.9,
      reviews: 5,
      status: 'archived',
      views: 234,
      favorites: 32,
      inquiries: 8,
    },
  ];

  const filteredListings =
    filter === 'all'
      ? mockListings
      : mockListings.filter((l) => l.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
            <p className="text-muted-foreground">Manage and track your property listings</p>
          </div>
          <Link
            href="/listings/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            <Plus className="w-5 h-5" />
            Create Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
            <p className="text-2xl font-bold text-foreground">{mockListings.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Views</p>
            <p className="text-2xl font-bold text-foreground">
              {mockListings.reduce((sum, l) => sum + l.views, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Favorites</p>
            <p className="text-2xl font-bold text-foreground">
              {mockListings.reduce((sum, l) => sum + l.favorites, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Inquiries</p>
            <p className="text-2xl font-bold text-foreground">
              {mockListings.reduce((sum, l) => sum + l.inquiries, 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-3">
          {(['all', 'active', 'archived'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border hover:bg-muted'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredListings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Inquiries
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{listing.title}</p>
                            <p className="text-xs text-muted-foreground">{listing.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-primary">₱{listing.price.toLocaleString()}/mo</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            listing.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {listing.views}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{listing.inquiries}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/listings/${listing.id}`}
                            className="p-2 hover:bg-muted rounded-lg transition"
                            title="View details"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <Link
                            href={`/listings/${listing.id}/edit`}
                            className="p-2 hover:bg-muted rounded-lg transition"
                            title="Edit listing"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition"
                            title="Delete listing"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No listings found</p>
              <Link
                href="/listings/create"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Create Your First Listing
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
