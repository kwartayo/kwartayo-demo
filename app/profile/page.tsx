'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Camera, Mail, Phone, MapPin, Star, Edit2, LogOut, Award } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userRole={null} setUserRole={() => {}} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
            <Link href="/auth/login" className="text-primary hover:underline">
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const verificationColors = {
    unverified: 'bg-gray-100 text-gray-800',
    basic: 'bg-blue-100 text-blue-800',
    premium: 'bg-purple-100 text-purple-800',
  };

  const verificationLabels = {
    unverified: 'Unverified',
    basic: 'Basic Verified',
    premium: 'Premium Verified',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-primary to-primary/60"></div>

          <div className="px-8 pb-8 pt-0 relative">
            {/* Avatar */}
            <div className="flex items-end gap-6 -mt-16 mb-6">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  <p className="text-muted-foreground">{user.role === 'owner' ? 'Property Owner' : 'Room Seeker'}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${verificationColors[user.verificationTier]}`}>
                <Award className="w-4 h-4 inline mr-2" />
                {verificationLabels[user.verificationTier]}
              </span>

              {user.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{user.rating}</span>
                  <span className="text-muted-foreground">({user.reviews} reviews)</span>
                </div>
              )}
            </div>

            {/* Edit/View Mode */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {user.bio && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                      <p className="text-foreground">{user.bio}</p>
                    </div>
                  )}

                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p className="text-foreground">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  {user.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-foreground">{user.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-semibold text-foreground capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-semibold text-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Verification Status</span>
                <span className="font-semibold text-primary capitalize">{user.verificationTier}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {user.role === 'owner' && (
                <>
                  <Link href="/listings" className="block px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-center">
                    Manage Listings
                  </Link>
                  <Link href="/listings/create" className="block px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition text-center">
                    Create New Listing
                  </Link>
                </>
              )}

              {user.role === 'seeker' && (
                <>
                  <Link href="/" className="block px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-center">
                    Browse Properties
                  </Link>
                  <Link href="/favorites" className="block px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition text-center">
                    Saved Properties
                  </Link>
                </>
              )}

              <Link href="/messages" className="block px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition text-center">
                Messages
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
