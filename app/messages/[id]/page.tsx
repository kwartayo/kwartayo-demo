'use client';

import React from "react"

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { ChevronLeft, Send, Phone, Video, MoreVertical, MapPin } from 'lucide-react';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
  avatar: string;
  name: string;
}

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!user) {
    return null;
  }

  // Mock conversation data
  const conversation = {
    id: params.id,
    otherUser: {
      id: 'owner1',
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      verified: true,
      role: 'owner',
    },
    property: {
      title: 'Cozy Room near UP Diliman',
      id: '1',
      location: 'Quezon City',
      price: 8500,
    },
    messages: [
      {
        id: '1',
        sender: 'other',
        text: 'Hi! Thanks for your interest in the room.',
        timestamp: '10:30 AM',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      },
      {
        id: '2',
        sender: 'me',
        text: 'Hi Maria! Is the room still available?',
        timestamp: '10:35 AM',
        name: user.name,
        avatar: user.avatar,
      },
      {
        id: '3',
        sender: 'other',
        text: 'Yes, it is! The room is available from next month.',
        timestamp: '10:40 AM',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      },
      {
        id: '4',
        sender: 'other',
        text: 'Would you like to schedule a viewing? I can show it to you this weekend.',
        timestamp: '10:41 AM',
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      },
      {
        id: '5',
        sender: 'me',
        text: 'That sounds great! Saturday afternoon works for me.',
        timestamp: '10:45 AM',
        name: user.name,
        avatar: user.avatar,
      },
    ],
  };

  setMessages(conversation.messages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      sender: 'me',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      name: user.name,
      avatar: user.avatar,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate a reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'other',
          text: 'That works perfectly! See you Saturday!',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          name: conversation.otherUser.name,
          avatar: conversation.otherUser.avatar,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation userRole={user.role} setUserRole={() => {}} />

      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link
              href="/messages"
              className="p-2 hover:bg-muted rounded-lg transition lg:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <img
                src={conversation.otherUser.avatar || "/placeholder.svg"}
                alt={conversation.otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-foreground">
                  {conversation.otherUser.name}
                  {conversation.otherUser.verified && (
                    <span className="ml-1 text-primary text-xs">✓</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {conversation.property?.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Video className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Property Context */}
        {conversation.property && (
          <Link
            href={`/listings/${conversation.property.id}`}
            className="bg-primary/10 px-6 py-3 flex items-center gap-3 hover:bg-primary/20 transition"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              {conversation.property.title} • ₱{conversation.property.price}/month
            </span>
          </Link>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'me' ? 'justify-end' : ''}`}
            >
              {message.sender === 'other' && (
                <img
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}

              <div
                className={`max-w-xs lg:max-w-md ${
                  message.sender === 'me' ? 'order-2' : ''
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <p
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.sender === 'me' ? 'text-right' : ''
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-border px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
