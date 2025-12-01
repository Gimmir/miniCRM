'use client';

import React from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  pullMoveY: number;
  isRefreshing: boolean;
}

export const PullToRefreshIndicator = ({ 
  pullMoveY, 
  isRefreshing 
}: PullToRefreshIndicatorProps) => {
  return (
    <div 
      className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-0"
      style={{ 
        height: `${pullMoveY}px`,
        opacity: pullMoveY > 0 ? 1 : 0,
        transition: isRefreshing ? 'height 0.3s ease' : 'none'
      }}
    >
      <div className="flex items-end pb-4">
        {isRefreshing ? (
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        ) : (
          <div className="flex flex-col items-center">
            <div 
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100"
              style={{ transform: `rotate(${pullMoveY * 2}deg)` }}
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
