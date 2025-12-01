'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CalendarClock, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export interface ScheduleItemProps {
  time: string;
  endTime: string;
  title: string;
  client: string;
  status: 'confirmed' | 'cancelled';
  price: string;
  onCall?: () => void;
  onMessage?: () => void;
  onReschedule?: () => void;
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
  onReschedule
}: ScheduleItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCancelled = status === 'cancelled';

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative flex flex-col bg-white rounded-2xl mb-3 last:mb-0 transition-all duration-300 cursor-pointer overflow-hidden z-0 select-none
        border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)]
        ${isCancelled ? 'bg-slate-50/60' : 'active:bg-slate-50'}
        ${isExpanded ? 'ring-2 ring-blue-500/10' : ''}
      `}
    >
      {/* Status Stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-400' : 'bg-emerald-500'}`}></div>

      {/* Main Content */}
      <div className="pl-4 pr-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Time */}
        <div className="flex flex-col items-center w-12 shrink-0 border-r border-slate-100 pr-3 mr-1">
          <span className={`text-sm font-bold leading-none ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {time}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">{endTime}</span>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className={`text-sm font-bold truncate ${isCancelled ? 'text-slate-500' : 'text-slate-900'}`}>
              {title}
            </h4>
            {isCancelled && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 rounded">СКАСОВАНО</span>}
          </div>
           
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isCancelled ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
              {client.charAt(0)}
            </div>
            <span className="truncate font-medium">{client}</span>
            <span className="text-slate-300 mx-1">•</span>
            <span className={`${isCancelled ? 'line-through text-slate-400' : 'text-slate-700 font-semibold'}`}>{price}</span>
          </div>
        </div>

        {/* Right: Expand Icon */}
        <div className="shrink-0 text-slate-300">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Actions (Expandable Area) */}
      <div className={`
        bg-slate-50/50 border-t border-slate-100 px-4 transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-20 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}
      `}>
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onCall?.(); }}
            className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:bg-green-50 active:border-green-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Дзвінок</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMessage?.(); }}
            className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 active:bg-blue-50 active:border-blue-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Написати</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onReschedule?.(); }}
            className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 active:bg-amber-50 active:border-amber-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Перенести</span>
          </button>
        </div>
      </div>
    </div>
  );
};
