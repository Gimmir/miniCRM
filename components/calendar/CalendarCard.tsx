'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// --- HELPERS ---
const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const getWeekDaysForSelected = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay(); 
  const diff = start.getDate() - (day === 0 ? 6 : day - 1); 
  const monday = new Date(start);
  monday.setDate(diff);
  
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d);
  }
  return week;
};

// --- TYPES ---
export interface CalendarCardProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  hasEvent?: (day: number, month: number) => boolean;
}

export const CalendarCard = ({ 
  selectedDate, 
  onDateChange,
  hasEvent = () => false
}: CalendarCardProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const [isExpanded, setIsExpanded] = useState(false);

  // Розрахунок кількості тижнів для динамічної висоти
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 
  
  const totalSlots = startingDayIndex + daysInMonth;
  const numWeeks = Math.ceil(totalSlots / 7);

  // Конфігурація висоти
  const ROW_HEIGHT = 48; 
  const CONTAINER_PADDING = 12;
  
  const expandedHeight = (numWeeks * ROW_HEIGHT) + CONTAINER_PADDING;
  const collapsedHeight = ROW_HEIGHT + CONTAINER_PADDING;

  const handlePrev = () => {
    if (isExpanded) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 7);
      onDateChange(newDate);
      if (newDate.getMonth() !== currentDate.getMonth()) {
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    }
  };

  const handleNext = () => {
    if (isExpanded) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 7);
      onDateChange(newDate);
      if (newDate.getMonth() !== currentDate.getMonth()) {
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    onDateChange(date);
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="bg-white rounded-b-[2rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border-b border-x border-slate-100 -mx-4 -mt-4 pt-2 pb-2 px-4 mb-6 relative z-20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          onClick={handlePrev} 
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full transition-colors text-slate-500 active:scale-90 active:bg-slate-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div 
          className="flex flex-col items-center cursor-pointer select-none active:opacity-70 transition-opacity" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-bold text-slate-900 capitalize flex items-center gap-2">
            {monthNames[isExpanded ? currentDate.getMonth() : selectedDate.getMonth()]}
          </h2>
          <span className="text-xs font-medium text-slate-400 tracking-wide">
            {isExpanded ? currentDate.getFullYear() : selectedDate.getFullYear()}
          </span>
        </div>

        <button 
          onClick={handleNext} 
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full transition-colors text-slate-500 active:scale-90 active:bg-slate-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 mb-2 place-items-center">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-full">
            {day}
          </div>
        ))}
      </div>

      {/* Animated Grid Container */}
      <div 
        className="relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] p-1.5 -mx-1.5" 
        style={{ 
          height: isExpanded ? `${expandedHeight}px` : `${collapsedHeight}px`
        }}
      >
        {isExpanded ? (
          // MONTH VIEW
          <div className="grid grid-cols-7 gap-y-0 place-items-center animate-in fade-in duration-300 w-full">
            {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`empty-${i}`} className="w-full h-12" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
              
              return (
                <div key={day} className="w-full flex justify-center py-1">
                  <button
                    onClick={() => handleDateSelect(dateObj)}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all relative
                      ${isSelected 
                        ? 'bg-blue-600 text-white font-bold scale-100 z-10' 
                        : isToday 
                          ? 'text-blue-600 bg-blue-50 font-bold border border-blue-100'
                          : 'text-slate-700 font-medium hover:bg-slate-50 active:bg-slate-100 active:scale-90'
                      }
                    `}
                  >
                    {day}
                    {hasEvent(day, currentDate.getMonth()) && !isSelected && (
                      <div className="absolute bottom-1.5 w-1 h-1 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          // WEEK VIEW
          <div className="grid grid-cols-7 gap-y-0 place-items-center animate-in fade-in duration-300 w-full">
             {getWeekDaysForSelected(selectedDate).map((date, i) => {
               const day = date.getDate();
               const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === date.getMonth();
               const isToday = new Date().getDate() === day && new Date().getMonth() === date.getMonth();

               return (
                <div key={i} className="w-full flex justify-center py-1">
                  <button
                    onClick={() => handleDateSelect(date)}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all relative
                      ${isSelected 
                        ? 'bg-blue-600 text-white font-bold scale-100 z-10' 
                        : isToday 
                          ? 'text-blue-600 bg-blue-50 font-bold border border-blue-100'
                          : 'text-slate-700 font-medium hover:bg-slate-50 active:bg-slate-100 active:scale-90'
                      }
                    `}
                  >
                    <span>{day}</span>
                    {hasEvent(day, date.getMonth()) && !isSelected && (
                      <div className="absolute bottom-1.5 w-1 h-1 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                </div>
               );
             })}
          </div>
        )}
      </div>

      {/* Expand Arrow */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center pt-2 pb-1 -mb-1 opacity-40 hover:opacity-100 transition-opacity active:scale-95"
      >
         {isExpanded ? (
           <ChevronUp className="w-5 h-5 text-slate-400" />
         ) : (
           <ChevronDown className="w-5 h-5 text-slate-400" />
         )}
      </button>
    </div>
  );
};

export { monthNames };