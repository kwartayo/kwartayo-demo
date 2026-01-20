'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    beds: '1',
    baths: '1',
    amenities: [] as string[],
    description: '',
    images: [] as string[],
    type: 'room',
  });

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      router.push('/auth/login?role=owner');
    }
  }, [user, router]);

  if (!user || user.role !== 'owner') {
    return null;
  }

  const amenitiesOptions = [
    'WiFi',
    'AC',
    'Heating',
    'Kitchen',
    'Parking',
    'Laundry',
    'TV',
    'Washer',
    'Dryer',
    'Dishwasher',
    'Security',
    'Garden',
  ];

  const locationOptions = [
    'Quezon City',
    'Makati',
    'Manila',
    'Pasig',
    'Taguig',
    'Muntinlupa',
    'Cavite',
    'Laguna',
  ];

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      // Submit form
      console.log('Form submitted:', formData);
      router.push('/listings');
    } else {
      setStep(step + 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.title && formData.type && formData.location && formData.price;
    if (step === 2) return formData.beds && formData.baths && formData.amenities.length > 0;
    if (step === 3) return formData.description;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/listings"
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to listings
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create Property Listing</h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition ${
                s <= step ? 'bg-primary' : 'bg-border'
              }`}
            ></div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Cozy Room near UP Diliman"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="room">Single Room</option>
                  <option value="rooms">Multiple Rooms</option>
                  <option value="property">Whole Property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Monthly Rent (PHP)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="e.g., 8500"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={formData.beds}
                    onChange={(e) =>
                      setFormData({ ...formData, beds: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={formData.baths}
                    onChange={(e) =>
                      setFormData({ ...formData, baths: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-4 py-2 rounded-lg border transition ${
                        formData.amenities.includes(amenity)
                          ? 'bg-primary text-white border-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {formData.amenities.includes(amenity) && (
                        <Check className="w-4 h-4 inline mr-1" />
                      )}
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Description</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your property in detail..."
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Images (Mock Upload)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground mb-2">
                    Drag and drop images here or click to select
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Up to 10 images (JPG, PNG)
                  </p>
                </div>
              </div>

              {/* Review */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">Review Your Listing</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Title:</span> {formData.title}</p>
                  <p><span className="text-muted-foreground">Location:</span> {formData.location}</p>
                  <p><span className="text-muted-foreground">Price:</span> ₱{formData.price}/month</p>
                  <p><span className="text-muted-foreground">Beds/Baths:</span> {formData.beds}/{formData.baths}</p>
                  <p><span className="text-muted-foreground">Amenities:</span> {formData.amenities.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              type="submit"
              disabled={!canProceed()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? (
                <>
                  <Check className="w-4 h-4" />
                  Publish Listing
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
