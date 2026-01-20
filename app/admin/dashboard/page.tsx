'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, CheckCircle, XCircle, AlertCircle, Users, Home, Flag, BarChart3, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface VerificationRequest {
  id: number;
  type: 'user' | 'listing';
  name: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  tier?: 'Basic' | 'Premium';
  reason?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'verifications' | 'listings' | 'reports' | 'analytics'>('verifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const mockVerificationRequests: VerificationRequest[] = [
    {
      id: 1,
      type: 'user',
      name: 'Maria Santos',
      submittedDate: '2024-01-15',
      status: 'pending',
      tier: 'Premium',
    },
    {
      id: 2,
      type: 'user',
      name: 'John Cruz',
      submittedDate: '2024-01-16',
      status: 'pending',
      tier: 'Basic',
    },
    {
      id: 3,
      type: 'listing',
      name: 'Cozy Room near UP Diliman',
      submittedDate: '2024-01-14',
      status: 'approved',
    },
    {
      id: 4,
      type: 'listing',
      name: '2 Rooms in Share House',
      submittedDate: '2024-01-10',
      status: 'approved',
    },
    {
      id: 5,
      type: 'user',
      name: 'Alex Rivera',
      submittedDate: '2024-01-17',
      status: 'pending',
      tier: 'Basic',
    },
    {
      id: 6,
      type: 'listing',
      name: 'Studio Apartment Ortigas',
      submittedDate: '2024-01-13',
      status: 'rejected',
      reason: 'Images quality too low',
    },
  ];

  const mockFlaggedListings = [
    {
      id: 1,
      title: 'Suspicious Property Listing',
      location: 'Unknown',
      reportedBy: 5,
      reason: 'Possibly scam',
      date: '2024-01-18',
    },
    {
      id: 2,
      title: 'Inappropriate Content',
      location: 'Makati',
      reportedBy: 3,
      reason: 'Offensive description',
      date: '2024-01-17',
    },
    {
      id: 3,
      title: 'Duplicate Listing',
      location: 'BGC',
      reportedBy: 2,
      reason: 'Same property listed twice',
      date: '2024-01-16',
    },
  ];

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleApprove = (id: number) => {
    const request = mockVerificationRequests.find((r) => r.id === id);
    if (request) {
      request.status = 'approved';
      setSelectedRequest(null);
    }
  };

  const handleReject = (id: number) => {
    const request = mockVerificationRequests.find((r) => r.id === id);
    if (request) {
      request.status = 'rejected';
      setSelectedRequest(null);
    }
  };

  const filteredRequests = mockVerificationRequests
    .filter((r) => statusFilter === 'all' || r.status === statusFilter)
    .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const stats = {
    totalUsers: 1243,
    verifiedUsers: 987,
    totalListings: 456,
    flaggedItems: 12,
    pendingVerifications: mockVerificationRequests.filter((r) => r.status === 'pending').length,
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Kwartayo Admin</h1>
              <p className="text-xs text-muted-foreground">Platform Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
              </div>
              <Users size={32} className="text-primary/30" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Users</p>
                <p className="text-3xl font-bold text-accent">{stats.verifiedUsers}</p>
              </div>
              <CheckCircle size={32} className="text-accent/30" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalListings}</p>
              </div>
              <Home size={32} className="text-primary/30" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-3xl font-bold text-primary">{stats.pendingVerifications}</p>
              </div>
              <AlertCircle size={32} className="text-primary/30" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Items</p>
                <p className="text-3xl font-bold text-destructive">{stats.flaggedItems}</p>
              </div>
              <Flag size={32} className="text-destructive/30" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'verifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Verifications ({stats.pendingVerifications})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Reports ({mockFlaggedListings.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            <div className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search verifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-border'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{request.name}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            request.type === 'user'
                              ? 'bg-accent/10 text-accent'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {request.type === 'user' ? 'User' : 'Listing'}
                        </span>
                        {request.tier && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                            {request.tier} Tier
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Submitted {new Date(request.submittedDate).toLocaleDateString()}
                      </p>
                      {request.reason && (
                        <p className="text-sm text-destructive mt-2">Rejection: {request.reason}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-4 py-2 bg-destructive text-white rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <span className="flex items-center gap-2 text-accent text-sm font-medium">
                          <CheckCircle size={18} />
                          Approved
                        </span>
                      )}
                      {request.status === 'rejected' && (
                        <span className="flex items-center gap-2 text-destructive text-sm font-medium">
                          <XCircle size={18} />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid gap-4">
            {mockFlaggedListings.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Location: {item.location}</p>
                    <p className="text-sm text-destructive mb-3">Reason: {item.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.reportedBy} reports • {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                User Growth
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">75%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Month</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">67%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Listing Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Listings</span>
                  <span className="font-semibold text-foreground">398</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Review</span>
                  <span className="font-semibold text-primary">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Archived</span>
                  <span className="font-semibold text-foreground">30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
