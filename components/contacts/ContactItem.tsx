'use client';

import React from 'react';
import { Phone, MessageCircle, ChevronRight } from 'lucide-react';

export interface ContactItemProps {
  id: string;
  name: string;
  phone: string;
  lastVisit?: string;
  lastVisitDate?: string | null;
  avatarColor?: string;
  onCall?: () => void;
  onMessage?: () => void;
  onClick?: () => void;
}

export const ContactItem = ({
  name,
  phone,
  lastVisit,
  avatarColor = 'bg-emerald-100 text-emerald-700',
  onCall,
  onMessage,
  onClick
}: ContactItemProps) => {
  
  const handleAction = (e: React.MouseEvent, action?: () => void) => {
    e.stopPropagation();
    action?.();
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      onClick={onClick}
      className="group bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] select-none"
    >
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${avatarColor}`}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base truncate mb-0.5">
            {name}
          </h3>
          <p className="text-sm text-slate-500 font-medium truncate mb-1">
            {phone}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
             <span>Останній: <span className="text-slate-600 font-medium">{lastVisit || '—'}</span></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 pl-2">
          <button 
            onClick={(e) => handleAction(e, onCall)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors active:bg-slate-100 border border-transparent hover:border-green-100"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => handleAction(e, onMessage)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors active:bg-slate-100 border border-transparent hover:border-blue-100"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};