'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import {
  ChevronLeft,
  Edit,
  Trash2,
  MapPin,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Star,
} from 'lucide-react';

export default function ListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      router.push('/auth/login?role=owner');
    }
  }, [user, router]);

  if (!user || user.role !== 'owner') {
    return null;
  }

  // Mock listing data
  const listing = {
    id: params.id,
    title: 'Cozy Room near UP Diliman',
    location: 'Quezon City',
    price: 8500,
    beds: 1,
    baths: 1,
    amenities: ['WiFi', 'AC', 'Parking'],
    description:
      'A comfortable and cozy room perfect for students and professionals. Located near UP Diliman campus with easy access to major transportation. The room comes with WiFi, air conditioning, and a secure parking space.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    owner: 'Maria Santos',
    ownerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    verified: true,
    rating: 4.8,
    reviews: 12,
    status: 'active',
    views: 145,
    favorites: 23,
    inquiries: 5,
    createdAt: '2024-01-15',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/listings"
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to listings
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <span
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  listing.status === 'active'
                    ? 'bg-green-500'
                    : 'bg-gray-500'
                }`}
              >
                {listing.status}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <span>Listed {listing.createdAt}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/listings/${listing.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-primary mb-6">
              ₱{listing.price.toLocaleString()}
              <span className="text-lg text-muted-foreground ml-2">/month</span>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 p-6 bg-muted rounded-lg">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Views</p>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{listing.views}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Favorites</p>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{listing.favorites}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Inquiries</p>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{listing.inquiries}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <p className="text-2xl font-bold text-foreground">{listing.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Bedrooms</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {listing.beds}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Bathrooms</p>
                  <p className="text-2xl font-bold text-foreground">{listing.baths}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">About</h2>
              <p className="text-foreground leading-relaxed">{listing.description}</p>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Photos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.images.map((image, i) => (
                  <img
                    key={i}
                    src={image || "/placeholder.svg"}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-foreground mb-4">About the Owner</h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={listing.ownerImage || "/placeholder.svg"}
                  alt={listing.owner}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{listing.owner}</p>
                  {listing.verified && (
                    <p className="text-xs text-primary">✓ Verified Owner</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">{listing.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({listing.reviews} reviews)
                </span>
              </div>

              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                Contact Owner
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm">
                  Boost Listing
                </button>
                <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm">
                  View Analytics
                </button>
                <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm">
                  Share Listing
                </button>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Recent Inquiries</h3>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="pb-3 border-b border-border last:border-0">
                    <p className="font-medium text-sm text-foreground">
                      Inquiry from Seeker
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
