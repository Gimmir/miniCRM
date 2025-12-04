'use client';

import React from 'react';
import { Phone, MessageCircle, ChevronRight } from 'lucide-react';

export interface ContactItemProps {
  id: string;
  name: string;
  phone: string; // Залишаємо в пропсах, але не рендеримо, якщо знадобиться для логіки
  lastVisit?: string;
  avatarColor?: string;
  onCall?: () => void;
  onMessage?: () => void;
  onClick?: () => void;
}

export const ContactItem = ({
  name,
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
      <div className="flex items-center gap-3">
        
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor}`}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-900 truncate mb-0.5">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
             <span>Останній: <span className="text-slate-600 font-medium">{lastVisit || '—'}</span></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 pl-1">
          <button 
            onClick={(e) => handleAction(e, onCall)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors active:bg-slate-100 border border-transparent hover:border-green-100"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => handleAction(e, onMessage)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors active:bg-slate-100 border border-transparent hover:border-blue-100"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <div className="ml-1 text-slate-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};