'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CalendarClock, 
  ChevronDown, 
  ChevronUp,
  User // Іконка для кнопки профілю
} from 'lucide-react';

export interface ScheduleItemProps {
  id?: string;
  time: string;
  endTime: string;
  title: string;
  client: string;
  status: 'confirmed' | 'cancelled';
  price: string;
  onCall?: () => void;
  onMessage?: () => void;
  onReschedule?: () => void;
  onDetails?: () => void; // Новий хендлер для переходу
}

export const ScheduleItem = ({ 
  time, 
  endTime,
  title, 
  client, 
  status,
  price,
  onCall,
  onMessage,
  onReschedule,
  onDetails
}: ScheduleItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCancelled = status === 'cancelled';

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative flex flex-col bg-white rounded-2xl mb-3 last:mb-0 transition-all duration-300 cursor-pointer overflow-hidden select-none
        border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)]
        ${isCancelled ? 'bg-slate-50/60' : 'active:bg-slate-50'}
        ${isExpanded ? 'ring-2 ring-blue-500/10 shadow-md' : ''}
      `}
    >
      {/* Status Stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-400' : 'bg-emerald-500'}`}></div>

      {/* Main Content */}
      <div className="pl-4 pr-3 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Time */}
        <div className="flex flex-col items-center w-12 shrink-0 border-r border-slate-100 pr-3 mr-1">
          <span className={`text-sm font-bold leading-none ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {time}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">{endTime}</span>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`text-sm font-bold truncate leading-none ${isCancelled ? 'text-slate-500' : 'text-slate-900'}`}>
              {title}
            </h4>
            {isCancelled && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">СКАСОВАНО</span>}
          </div>
           
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${isCancelled ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                {client.charAt(0)}
                </div>
                <span className="text-xs text-slate-500 font-medium truncate">{client}</span>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-700 bg-slate-50 border border-slate-100'}`}>
                {price}
            </span>
          </div>
        </div>

        {/* Right: Expand Icon */}
        <div className="shrink-0 text-slate-300">
           {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Actions (Expandable Area) */}
      <div className={`
        bg-slate-50/50 border-t border-slate-100 px-3 transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-20 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}
      `}>
        <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onCall?.(); }}
              className="flex-1 h-9 text-[10px] font-bold text-slate-600 bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:bg-green-50 active:border-green-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Дзвінок</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMessage?.(); }}
              className="flex-1 h-9 text-[10px] font-bold text-slate-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 active:bg-blue-50 active:border-blue-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Написати</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onReschedule?.(); }}
              className="flex-1 h-9 text-[10px] font-bold text-slate-600 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 active:bg-amber-50 active:border-amber-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Перенести</span>
            </button>
            
            {/* Кнопка переходу до профілю */}
            <button 
              onClick={(e) => { e.stopPropagation(); onDetails?.(); }}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-all active:scale-95 shadow-sm"
            >
              <User className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};