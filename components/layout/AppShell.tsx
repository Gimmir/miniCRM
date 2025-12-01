'use client';

import React, { useEffect, useState } from 'react';
import { useTelegram, usePullToRefresh } from '@/hooks';
import { Header } from './Header';
import { PullToRefreshIndicator } from './PullToRefreshIndicator';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  onRefresh?: () => Promise<void>;
}

export const AppShell = ({ 
  children, 
  title,
  onRefresh 
}: AppShellProps) => {
  const { user, webApp } = useTelegram();
  const [mounted, setMounted] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const {
    isRefreshing,
    pullMoveY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = usePullToRefresh({
    onRefresh: handleRefresh,
    webApp
  });

  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="flex-1 w-full md:pl-72 flex flex-col min-w-0 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* PULL TO REFRESH INDICATOR */}
      <PullToRefreshIndicator 
        pullMoveY={pullMoveY}
        isRefreshing={isRefreshing}
      />

      {/* Header (Page Specific) */}
      <Header 
        user={user}
        title={title}
        onSearch={() => console.log('Search')}
        onNotifications={() => console.log('Notifications')}
      />

      {/* Scrollable Content - Animated with Pull */}
      <main 
        className="flex-1 p-4 md:p-10 w-full max-w-7xl mx-auto pb-24 md:pb-10 relative z-10 bg-[#fafafa] transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${pullMoveY}px)` }}
      >
        {children}
      </main>
    </div>
  );
};