'use client';

import React, { useState } from 'react';
import { Plus, CalendarClock } from 'lucide-react';
import { AppShell } from '@/components/layout';
import { CalendarCard, monthNames } from '@/components/calendar';
import { ScheduleItem } from '@/components/schedule';

// Мок функція для перевірки наявності подій
const hasEvent = (day: number, month: number) => {
  return [3, 8, 12, 15, 22, 28].includes(day); 
};

// Мок дані для розкладу
const mockScheduleData = [
  { time: "09:00", endTime: "10:00", title: "Стрижка", client: "Іван П.", status: "confirmed" as const, price: "400 ₴" },
  { time: "11:30", endTime: "13:00", title: "Фарбування", client: "Анна М.", status: "confirmed" as const, price: "2500 ₴" },
  { time: "14:00", endTime: "14:45", title: "Консультація", client: "Олена К.", status: "cancelled" as const, price: "0 ₴" },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const hasEventsForSelectedDate = hasEvent(selectedDate.getDate(), selectedDate.getMonth());

  return (
    <AppShell title="Календар">
      <div className="animate-in fade-in duration-500 pb-20">
      
        {/* Calendar Card */}
        <CalendarCard 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          hasEvent={hasEvent}
        />

        {/* Agenda Section */}
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
            {hasEventsForSelectedDate ? (
              <div className="animate-in slide-in-from-bottom-2 fade-in duration-300 space-y-3">
                {mockScheduleData.map((item, index) => (
                  <ScheduleItem 
                    key={index}
                    {...item}
                    onCall={() => console.log('Call', item.client)}
                    onMessage={() => console.log('Message', item.client)}
                    onReschedule={() => console.log('Reschedule', item.title)}
                  />
                ))}
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