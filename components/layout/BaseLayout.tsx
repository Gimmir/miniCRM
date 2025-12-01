'use client';

import React from 'react';
import { useTelegram } from '@/hooks';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { user } = useTelegram();

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] text-slate-900 font-sans flex overflow-x-hidden">
      {/* Persistent Sidebar for Desktop */}
      <Sidebar user={user} />

      {/* Main Content Area (Children will handle their own padding/headers) */}
      {children}

      {/* Persistent Mobile Nav */}
      <MobileNav />
    </div>
  );
};