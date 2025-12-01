'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionBtnProps {
  icon: LucideIcon;
  label: string;
  subLabel: string;
  color?: 'blue' | 'white';
  onClick?: () => void;
}

export const QuickActionBtn = ({ 
  icon: Icon, 
  label, 
  subLabel, 
  color = 'blue',
  onClick
}: QuickActionBtnProps) => {
  const isBlue = color === 'blue';
  
  return (
    <button 
      onClick={onClick}
      className={`
        relative flex items-center p-3 rounded-2xl transition-all duration-300 group w-full text-left shadow-sm
        ${isBlue 
          ? 'bg-blue-600 text-white shadow-blue-500/20 active:bg-blue-700' 
          : 'bg-white border border-slate-100 text-slate-900 active:bg-slate-50'
        }
        active:scale-[0.98] z-0 select-none
      `}
    >
      <div className={`
        p-2 rounded-xl mr-3 shrink-0 transition-transform group-hover:scale-110 duration-300
        ${isBlue ? 'bg-white/15' : 'bg-blue-50'}
      `}>
        <Icon className={`w-5 h-5 ${isBlue ? 'text-white' : 'text-blue-600'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <span className={`block text-[9px] font-bold uppercase tracking-wider opacity-80 mb-0.5 ${isBlue ? 'text-blue-100' : 'text-slate-400'}`}>
          {subLabel}
        </span>
        <span className="block text-sm font-bold leading-none truncate">
          {label}
        </span>
      </div>

      {isBlue && (
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      )}
    </button>
  );
};
