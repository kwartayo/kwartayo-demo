'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign } from 'lucide-react';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

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

  const priceRanges = [
    '₱0 - ₱5,000',
    '₱5,000 - ₱10,000',
    '₱10,000 - ₱15,000',
    '₱15,000+',
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Location Search */}
      <div className="flex-1 relative">
        <div className="absolute left-3 top-3 text-muted-foreground">
          <MapPin className="w-5 h-5" />
        </div>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
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
      <div className="flex-1 relative">
        <div className="absolute left-3 top-3 text-muted-foreground">
          <DollarSign className="w-5 h-5" />
        </div>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="">All Prices</option>
          {priceRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button className="md:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium flex items-center justify-center gap-2 text-sm">
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}
