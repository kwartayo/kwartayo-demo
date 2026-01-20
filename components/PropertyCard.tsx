'use client';

import { Heart, MapPin, Users, Zap, Star } from 'lucide-react';
import Image from 'next/image';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  amenities: string[];
  image: string;
  owner: string;
  ownerImage: string;
  verified: boolean;
  badge?: string | null;
  rating: number;
  reviews: number;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  beds,
  baths,
  amenities,
  image,
  owner,
  ownerImage,
  verified,
  badge,
  rating,
  reviews,
  isFavorited,
  onFavoriteToggle,
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded">
            {badge}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-primary hover:text-white transition"
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-current text-primary' : ''}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-bold text-foreground text-sm flex-1">{title}</h3>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-primary text-lg">₱{price.toLocaleString()}</p>
            <p className="text-muted-foreground text-xs">per month</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
            <Zap className="w-3 h-3 text-primary" />
            <span>{amenities[0]}</span>
          </div>
          {amenities.length > 1 && (
            <div className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
              +{amenities.length - 1} more
            </div>
          )}
        </div>

        {/* Beds & Baths */}
        <div className="flex gap-3 text-xs mb-4 pb-4 border-b border-border">
          <span className="flex items-center gap-1 text-muted-foreground">
            <span className="font-semibold">🛏️</span> {beds} room{beds > 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <span className="font-semibold">🚿</span> {baths} bath{baths > 1 ? 's' : ''}
          </span>
        </div>

        {/* Owner Info & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={ownerImage || "/placeholder.svg"}
              alt={owner}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-xs">
              <p className="font-medium text-foreground">{owner}</p>
              {verified && <p className="text-primary text-xs">✓ Verified</p>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
