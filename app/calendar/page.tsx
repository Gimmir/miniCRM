'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CalendarClock,
  Phone,
  MessageCircle,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AppShell } from '@/components/layout';

// --- TYPES & HELPERS ---

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

const hasEvent = (day: number, month: number) => {
  return [3, 8, 12, 15, 22, 28].includes(day); 
};

// --- SUB-COMPONENTS ---

const ScheduleItem = ({ 
  time, 
  endTime,
  title, 
  client, 
  status,
  price
}: { 
  time: string, 
  endTime: string,
  title: string, 
  client: string, 
  status: 'confirmed' | 'cancelled',
  price: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCancelled = status === 'cancelled';

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative flex flex-col bg-white rounded-2xl mb-3 last:mb-0 transition-all duration-300 cursor-pointer overflow-hidden select-none
        border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)]
        ${isCancelled ? 'bg-slate-50/60' : 'active:bg-slate-50'}
        ${isExpanded ? 'ring-2 ring-blue-500/10' : ''}
      `}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-400' : 'bg-emerald-500'}`}></div>

      <div className="pl-4 pr-4 py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col items-center w-12 shrink-0 border-r border-slate-100 pr-3 mr-1">
          <span className={`text-sm font-bold leading-none ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {time}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">{endTime}</span>
        </div>

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

        <div className="shrink-0 text-slate-300">
           {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      <div className={`
        bg-slate-50/50 border-t border-slate-100 px-4 transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-20 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}
      `}>
        <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Call'); }}
              className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:bg-green-50 active:border-green-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Дзвінок</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Message'); }}
              className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 active:bg-blue-50 active:border-blue-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Написати</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Reschedule'); }}
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

// --- MAIN PAGE ---

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const handlePrev = () => {
    if (isExpanded) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 7);
      setSelectedDate(newDate);
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
      setSelectedDate(newDate);
      if (newDate.getMonth() !== currentDate.getMonth()) {
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    }
  };

  // SWIPE LOGIC
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    // Detect horizontal swipe (for calendar navigation)
    if (Math.abs(distanceX) > minSwipeDistance && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX > 0) handleNext(); // Swipe Left
      else handlePrev(); // Swipe Right
    } 
    // Detect vertical swipe (for expand/collapse) primarily on the calendar area
    else if (Math.abs(distanceY) > minSwipeDistance && Math.abs(distanceY) > Math.abs(distanceX)) {
       // Optional: Add logic to expand/collapse on vertical swipe if desired
       // For now, we rely on the handle click
    }
    
    setTouchStart(null);
  };

  return (
    <AppShell title="Календар">
      <div className="animate-in fade-in duration-500 pb-20">
      
        {/* Calendar Card */}
        <div 
          className="bg-white rounded-b-[2rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border-b border-x border-slate-100 -mx-4 -mt-4 pt-2 pb-4 px-4 mb-6 relative z-20 overflow-hidden touch-pan-y" 
          // `touch-pan-y` allows vertical scroll but captures horizontal swipes better
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-1">
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
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
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
          <div className="grid grid-cols-7 mb-3 place-items-center">
            {weekDays.map(day => (
              <div key={day} className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-full">
                {day}
              </div>
            ))}
          </div>

          {/* --- ANIMATED GRID CONTAINER --- */}
          <div 
            className="relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ 
              height: isExpanded ? '300px' : '50px' // Fixed heights for smoother animation
            }}
          >
            {isExpanded ? (
              // MONTH VIEW
              <div className="grid grid-cols-7 gap-y-1 place-items-center animate-in fade-in duration-300 w-full absolute top-0 left-0 right-0">
                {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`empty-${i}`} className="w-full" />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
                  const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
                  
                  return (
                    <div key={day} className="w-full flex justify-center py-1">
                      <button
                        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={`
                          w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all relative
                          ${isSelected 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
                            : isToday 
                              ? 'text-blue-600 bg-blue-50 font-bold border border-blue-100'
                              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100 active:scale-90'
                          }
                        `}
                      >
                        {day}
                        {hasEvent(day, currentDate.getMonth()) && !isSelected && (
                          <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              // WEEK VIEW
              <div className="grid grid-cols-7 gap-y-1 place-items-center animate-in fade-in duration-300 w-full absolute top-0 left-0 right-0">
                 {getWeekDaysForSelected(selectedDate).map((date, i) => {
                   const day = date.getDate();
                   const isSelected = selectedDate.getDate() === day;
                   const isToday = new Date().getDate() === day && new Date().getMonth() === date.getMonth();

                   return (
                    <div key={i} className="w-full flex justify-center py-1">
                      <button
                        onClick={() => {
                          setSelectedDate(date);
                          if (date.getMonth() !== currentDate.getMonth()) {
                             setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
                          }
                        }}
                        className={`
                          w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all relative
                          ${isSelected 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
                            : isToday 
                              ? 'text-blue-600 bg-blue-50 font-bold border border-blue-100'
                              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100 active:scale-90'
                          }
                        `}
                      >
                        <span>{day}</span>
                        {hasEvent(day, date.getMonth()) && !isSelected && (
                          <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full"></div>
                        )}
                      </button>
                    </div>
                   );
                 })}
              </div>
            )}
          </div>

          {/* Expand Handle (Draggable Area) */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center pt-4 pb-2 -mb-2 cursor-pointer active:opacity-50 touch-none"
            style={{ touchAction: 'none' }} // Prevents page scroll when dragging handle
          >
             <div className="w-10 h-1 bg-slate-200 rounded-full transition-colors group-hover:bg-slate-300"></div>
          </div>
        </div>

        {/* --- AGENDA SECTION --- */}
        <div className="space-y-4 px-1">
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
               {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
             </h3>
             <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all">
               <Plus className="w-5 h-5" />
             </button>
          </div>

          {/* Schedule List */}
          <div className="flex flex-col pb-safe">
             {hasEvent(selectedDate.getDate(), selectedDate.getMonth()) ? (
               <div className="animate-in slide-in-from-bottom-2 fade-in duration-300 space-y-3">
                 <ScheduleItem 
                   time="09:00" 
                   endTime="10:00" 
                   title="Стрижка" 
                   client="Іван П." 
                   status="confirmed" 
                   price="400 ₴" 
                 />
                 <ScheduleItem 
                   time="11:30" 
                   endTime="13:00" 
                   title="Фарбування" 
                   client="Анна М." 
                   status="confirmed" 
                   price="2500 ₴" 
                 />
                 <ScheduleItem 
                   time="14:00" 
                   endTime="14:45" 
                   title="Консультація" 
                   client="Олена К." 
                   status="cancelled" 
                   price="0 ₴" 
                 />
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center p-10 bg-white border border-dashed border-slate-200 rounded-2xl text-center shadow-sm mt-2 animate-in zoom-in-95 duration-300">
                  <div className="bg-slate-50 p-4 rounded-full mb-3">
                     <CalendarClock className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium text-sm">Немає записів</p>
                  <p className="text-slate-400 text-xs mt-1 max-w-[200px]">На цей день нічого не заплановано.</p>
                  <button className="mt-4 text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                    + Додати запис
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}