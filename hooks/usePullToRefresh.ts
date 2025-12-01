'use client';

import { useState, useCallback } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  dampening?: number;
  maxPull?: number;
  webApp?: {
    HapticFeedback?: {
      impactOccurred?: (style: string) => void;
      notificationOccurred?: (type: string) => void;
    };
  } | null;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 60,
  dampening = 0.45,
  maxPull = 120,
  webApp
}: UsePullToRefreshOptions) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullStartY, setPullStartY] = useState(0);
  const [pullMoveY, setPullMoveY] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPullStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (pullStartY === 0 || window.scrollY > 0) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - pullStartY;

    if (diff > 0) {
      const damped = Math.min(diff * dampening, maxPull); 
      setPullMoveY(damped);
    }
  }, [pullStartY, dampening, maxPull]);

  const handleTouchEnd = useCallback(async () => {
    if (pullMoveY > threshold) {
      setIsRefreshing(true);
      setPullMoveY(threshold);
      
      if (webApp?.HapticFeedback?.impactOccurred) {
        webApp.HapticFeedback.impactOccurred('medium');
      }

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullMoveY(0);
        
        if (webApp?.HapticFeedback?.notificationOccurred) {
          webApp.HapticFeedback.notificationOccurred('success');
        }
      }
    } else {
      setPullMoveY(0);
    }
    setPullStartY(0);
  }, [pullMoveY, threshold, webApp, onRefresh]);

  return {
    isRefreshing,
    pullMoveY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
