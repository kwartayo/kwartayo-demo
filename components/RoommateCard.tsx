'use client';

import { Heart, MapPin, Briefcase, Calendar, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface RoommateCardProps {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  image: string;
  location: string;
  occupation: string;
  budget: number;
  moveInDate: string;
  bio: string;
  interests: string[];
  verified: boolean;
  rating: number;
  reviews: number;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
}

export default function RoommateCard({
  id,
  name,
  age,
  gender,
  image,
  location,
  occupation,
  budget,
  moveInDate,
  bio,
  interests,
  verified,
  rating,
  reviews,
  isFavorited = false,
  onFavoriteToggle,
}: RoommateCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
      {/* Header with Image and Favorite */}
      <div className="relative h-48 bg-gradient-to-br from-accent to-primary overflow-hidden">
        <img
          src={image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors"
        >
          <Heart
            size={18}
            className={isFavorited ? 'fill-primary text-primary' : 'text-foreground'}
          />
        </button>

        {/* Badge for Verified */}
        {verified && (
          <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            ✓ Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Basic Info */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{age} years old • {gender}</p>
        </div>

        {/* Location and Occupation */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase size={16} className="text-primary" />
            <span>{occupation}</span>
          </div>
        </div>

        {/* Budget and Move-in Date */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-muted rounded p-2">
            <p className="text-muted-foreground text-xs">Budget</p>
            <p className="font-semibold text-foreground">₱{budget.toLocaleString()}/mo</p>
          </div>
          <div className="bg-muted rounded p-2">
            <p className="text-muted-foreground text-xs">Move-in</p>
            <p className="font-semibold text-foreground">{moveInDate}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-foreground mb-3 line-clamp-2">{bio}</p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-4">
          {interests.slice(0, 3).map((interest, idx) => (
            <span
              key={idx}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {interest}
            </span>
          ))}
          {interests.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">+{interests.length - 3}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>

        {/* Actions */}
        <Link
          href={`/roommateprofile/${id}`}
          className="block w-full py-2 text-center bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors mb-2 text-sm"
        >
          View Profile
        </Link>
        <button className="w-full py-2 border border-accent text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors flex items-center justify-center gap-2 text-sm">
          <MessageCircle size={16} />
          Message
        </button>
      </div>
    </div>
  );
}
