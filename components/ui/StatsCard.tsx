'use client';

import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  chartColor?: 'green' | 'blue';
}

export const StatsCard = ({
  title,
  value,
  trend,
  trendLabel,
  chartColor = 'green'
}: StatsCardProps) => {
  const isGreen = chartColor === 'green';
  const colorClass = isGreen ? 'text-emerald-600' : 'text-blue-600';
  const strokeColor = isGreen ? '#10b981' : '#3b82f6';
  const gradientId = isGreen ? 'gradient-green' : 'gradient-blue';

  return (
    <div className="bg-white border border-slate-100/80 rounded-2xl p-4 md:p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-slate-200 transition-all duration-300 z-0 select-none">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-2 md:mb-4">
          <span className="text-xs md:text-sm font-medium text-slate-500 truncate mr-2">{title}</span>
          <div className="hidden md:block bg-slate-50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </div>
        </div>
        <div>
          <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{value}</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5">
            <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md w-fit ${isGreen ? 'bg-emerald-50' : 'bg-blue-50'}`}>
              <TrendingUp className={`w-3 h-3 ${colorClass}`} />
              <span className={`text-[10px] md:text-xs font-bold ${colorClass}`}>{trend}</span>
            </div>
            <span className="text-[10px] md:text-xs text-slate-400 font-medium truncate">{trendLabel}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 opacity-20 z-0 pointer-events-none">
        <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,40 L0,30 C20,32 40,15 60,20 C80,25 90,5 100,0 L100,40 Z" fill={`url(#${gradientId})`} />
          <path d="M0,30 C20,32 40,15 60,20 C80,25 90,5 100,0" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
};
