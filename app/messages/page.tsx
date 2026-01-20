'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Search, Plus, MoreVertical, Trash2, Archive } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Loading from './loading';

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  property?: {
    title: string;
    id: string;
  };
}

export default function MessagesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return <Loading />;
  }

  // Mock conversations
  const mockConversations: Conversation[] = [
    {
      id: '1',
      otherUser: {
        id: 'owner1',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        verified: true,
      },
      lastMessage: 'The room is available from next month. Would you like to schedule a viewing?',
      lastMessageTime: '2 hours ago',
      unreadCount: 1,
      property: {
        title: 'Cozy Room near UP Diliman',
        id: '1',
      },
    },
    {
      id: '2',
      otherUser: {
        id: 'owner2',
        name: 'John Cruz',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        verified: true,
      },
      lastMessage: 'Thanks for your interest. The lease term is flexible.',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      property: {
        title: '2 Rooms in Share House',
        id: '2',
      },
    },
    {
      id: '3',
      otherUser: {
        id: 'seeker1',
        name: 'Juan Dela Cruz',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        verified: false,
      },
      lastMessage: 'Hi, is the room still available?',
      lastMessageTime: '1 day ago',
      unreadCount: 2,
      property: {
        title: 'Whole Property for Rent',
        id: '3',
      },
    },
    {
      id: '4',
      otherUser: {
        id: 'owner3',
        name: 'Ana Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
        verified: true,
      },
      lastMessage: 'Perfect! I can arrange a viewing this weekend.',
      lastMessageTime: '3 days ago',
      unreadCount: 0,
      property: {
        title: 'Studio Apartment Ortigas',
        id: '4',
      },
    },
  ];

  setConversations(mockConversations);

  const filteredConversations = mockConversations
    .filter((conv) => {
      if (filter === 'unread') return conv.unreadCount > 0;
      if (filter === 'archived') return false; // TODO: implement archived
      return true;
    })
    .filter((conv) =>
      conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalUnread = mockConversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
            {totalUnread > 0 && (
              <p className="text-muted-foreground">
                You have {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            <Plus className="w-5 h-5" />
            New Message
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Conversations List */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Conversation List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-border max-h-screen overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/messages/${conv.id}`}
                    className="p-4 hover:bg-muted transition flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.otherUser.avatar || "/placeholder.svg"}
                        alt={conv.otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-medium text-foreground ${conv.unreadCount > 0 ? 'font-bold' : ''}`}>
                          {conv.otherUser.name}
                        </p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      {conv.property && (
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          📍 {conv.property.title}
                        </p>
                      )}

                      <p
                        className={`text-sm truncate ${
                          conv.unreadCount > 0
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>No conversations found</p>
              </div>
            )}
          </div>

          {/* Main Content - Empty State */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">💬</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Select a conversation
                </h2>
                <p className="text-muted-foreground">
                  Click on a conversation from the left to start messaging
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
