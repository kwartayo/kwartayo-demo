'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Save, X } from 'lucide-react';

export default function PreferencesPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [preferences, setPreferences] = useState({
    budget_min: 5000,
    budget_max: 15000,
    locations: [] as string[],
    bedrooms: [],
    bathrooms: [],
    amenities: [] as string[],
    moveInDate: '',
    leaseTerm: '12',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'seeker') {
      router.push('/auth/login?role=seeker');
    }
  }, [user, router]);

  if (!user || user.role !== 'seeker') {
    return null;
  }

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

  const amenitiesOptions = [
    'WiFi',
    'AC',
    'Kitchen',
    'Parking',
    'Laundry',
    'TV',
    'Security',
    'Garden',
  ];

  const handleSavePreferences = () => {
    updateProfile({ ...user, location: preferences.locations.join(', ') });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleOption = (option: string, field: string) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(option)
        ? (prev[field as keyof typeof prev] as string[]).filter((o: string) => o !== option)
        : [...(prev[field as keyof typeof prev] as string[]), option],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Room Preferences</h1>
          <p className="text-muted-foreground">
            Set your preferences to get better recommendations
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Budget */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Budget Range</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Minimum: ₱{preferences.budget_min.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="3000"
                  max={preferences.budget_max}
                  value={preferences.budget_min}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      budget_min: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Maximum: ₱{preferences.budget_max.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={preferences.budget_min}
                  max="30000"
                  value={preferences.budget_max}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      budget_max: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Preferred Locations</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {locationOptions.map((location) => (
                <button
                  key={location}
                  onClick={() => toggleOption(location, 'locations')}
                  className={`px-4 py-3 rounded-lg border transition text-left ${
                    preferences.locations.includes(location)
                      ? 'bg-primary text-white border-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">Bedrooms</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => toggleOption(n.toString(), 'bedrooms')}
                    className={`w-full px-4 py-2 rounded-lg border transition ${
                      preferences.bedrooms.includes(n.toString())
                        ? 'bg-primary text-white border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {n} Bedroom{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">Bathrooms</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => toggleOption(n.toString(), 'bathrooms')}
                    className={`w-full px-4 py-2 rounded-lg border transition ${
                      preferences.bathrooms.includes(n.toString())
                        ? 'bg-primary text-white border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {n} Bathroom{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Must-Have Amenities</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {amenitiesOptions.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleOption(amenity, 'amenities')}
                  className={`px-4 py-3 rounded-lg border transition text-left ${
                    preferences.amenities.includes(amenity)
                      ? 'bg-primary text-white border-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Move-in Date & Lease Term */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Move-in Date
              </label>
              <input
                type="date"
                value={preferences.moveInDate}
                onChange={(e) =>
                  setPreferences({ ...preferences, moveInDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lease Term
              </label>
              <select
                value={preferences.leaseTerm}
                onChange={(e) =>
                  setPreferences({ ...preferences, leaseTerm: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSavePreferences}
              className="flex items-center gap-2 flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
          </div>

          {saved && (
            <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-green-800 text-sm">
              Your preferences have been saved successfully!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
