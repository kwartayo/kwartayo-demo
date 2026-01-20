'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Bell, MessageSquare, User } from 'lucide-react';

interface NavigationProps {
  userRole: 'owner' | 'seeker' | null;
  setUserRole: (role: 'owner' | 'seeker' | null) => void;
}

export default function Navigation({ userRole, setUserRole }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:inline">Kwartayo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {userRole === null && (
            <>
              <button className="text-foreground hover:text-primary transition">
                Browse
              </button>
              <button className="text-foreground hover:text-primary transition">
                How it works
              </button>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {userRole ? (
            <>
              <button className="p-2 hover:bg-muted rounded-lg relative">
                <MessageSquare className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-muted rounded-lg relative">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-muted rounded-lg">
                <User className="w-5 h-5 text-foreground" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setUserRole('seeker')}
                className="hidden sm:block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition text-sm font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setUserRole('owner')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition text-sm font-medium"
              >
                List Now
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            {userRole === null && (
              <>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg text-sm font-medium">
                  Browse Properties
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg text-sm font-medium">
                  How it works
                </button>
              </>
            )}
            {userRole && (
              <>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg text-sm font-medium">
                  My Profile
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg text-sm font-medium">
                  Messages
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
