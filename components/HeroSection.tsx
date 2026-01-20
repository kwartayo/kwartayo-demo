'use client';

interface HeroSectionProps {
  setUserRole: (role: 'owner' | 'seeker') => void;
}

export default function HeroSection({ setUserRole }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Find Your Perfect Room in the Philippines
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-balance">
            Connect with verified homeowners and roommates. Free to list, search & communicate.
          </p>
        </div>

        {/* Dual CTAs */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {/* Property Owner CTA */}
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Have a room to rent?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              List your property for free and connect with verified seekers
            </p>
            <button
              onClick={() => setUserRole('owner')}
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              List Your Property
            </button>
          </div>

          {/* Property Seeker CTA */}
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Looking for a room?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Browse available properties and connect with owners
            </p>
            <button
              onClick={() => setUserRole('seeker')}
              className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition"
            >
              Browse Properties
            </button>
          </div>

          {/* Roommate Seeker CTA */}
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Looking for roommates?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Create your profile and find compatible people to live with
            </p>
            <button
              onClick={() => setUserRole('seeker')}
              className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition"
            >
              Create Your Profile
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center text-white/80 text-sm">
          <p>✓ Verified Listings • Safe & Secure • Community Trust</p>
        </div>
      </div>
    </div>
  );
}
