'use client';

import React from "react"
import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Loader } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<'owner' | 'seeker'>('seeker'); // State to manage role

  const { login, isLoading } = useAuth();

  // Test credentials display
  const testCredentials = {
    owner: { email: 'owner@test.com', password: 'password123' },
    seeker: { email: 'seeker@test.com', password: 'password123' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, role);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const fillTestCredentials = () => {
    const creds = testCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="font-bold text-2xl text-foreground">Kwartayo</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome Back, {role === 'owner' ? 'Property Owner' : 'Seeker'}
          </h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Form */}
        <Suspense fallback={null}> {/* Wrap the form in a Suspense boundary */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="my-6 border-t border-border"></div>

            {/* Test Credentials */}
            <div className="bg-muted/50 p-4 rounded-lg text-sm mb-6">
              <p className="font-medium text-foreground mb-2">Demo Credentials</p>
              <p className="text-muted-foreground mb-3">
                Email: <code className="bg-white px-2 py-1 rounded text-xs">{testCredentials[role].email}</code>
              </p>
              <button
                type="button"
                onClick={fillTestCredentials}
                className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm hover:bg-muted transition"
              >
                Use Test Credentials
              </button>
            </div>

            {/* Footer Links */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href={`/auth/signup?role=${role}`} className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </Suspense>

        {/* Role Switcher */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Looking for something else?</p>
          <button
            type="button"
            onClick={() => setRole(role === 'owner' ? 'seeker' : 'owner')}
            className="text-primary hover:underline font-medium text-sm"
          >
            {role === 'owner' ? 'Sign in as Seeker' : 'Sign in as Owner'}
          </button>
        </div>
      </div>
    </div>
  );
}
