'use client';

import React from 'react';
import { UserPlus, CalendarPlus } from 'lucide-react';

import { AppShell } from '@/components/layout';
import { SectionTitle, StatsCard } from '@/components/ui';
import { QuickActionBtn } from '@/components/actions';
import { ScheduleList } from '@/components/schedule';

// --- MOCK DATA ---
const scheduleItems = [
  {
    time: "10:00",
    endTime: "11:30",
    title: "Манікюр Гель",
    client: "Марія К.",
    status: "confirmed" as const,
    price: "800 ₴"
  },
  {
    time: "12:30",
    endTime: "13:30",
    title: "Педикюр SPA",
    client: "Олена В.",
    status: "cancelled" as const,
    price: "950 ₴"
  },
  {
    time: "14:00",
    endTime: "14:45",
    title: "Консультація",
    client: "Новий клієнт",
    status: "confirmed" as const,
    price: "Безкоштовно"
  }
];

// --- MAIN APP ---
export default function HomePage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Stats & Actions) */}
        <div className="xl:col-span-2 space-y-8 min-w-0">
           
          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <QuickActionBtn 
              icon={UserPlus}
              subLabel="Додати"
              label="Клієнта"
              color="blue"
              onClick={() => console.log('Add client')}
            />
            <QuickActionBtn 
              icon={CalendarPlus}
              subLabel="Запланувати"
              label="Візит"
              color="white"
              onClick={() => console.log('Schedule visit')}
            />
          </div>

          {/* Stats */}
          <div>
            <SectionTitle title="Огляд за тиждень" />
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <StatsCard 
                title="Візитів"
                value="42"
                trend="+12%"
                trendLabel="минулий тижд."
                chartColor="green"
              />
              <StatsCard 
                title="Дохід"
                value="54 500 ₴"
                trend="+8%"
                trendLabel="минулий тижд."
                chartColor="blue"
              />
            </div>
          </div>
        </div>

        {/* Right Column (Schedule) */}
        <div className="xl:col-span-1 min-w-0">
          <ScheduleList 
            items={scheduleItems}
            onViewAll={() => console.log('View all')}
            onItemCall={(item) => console.log('Call', item.client)}
            onItemMessage={(item) => console.log('Message', item.client)}
            onItemReschedule={(item) => console.log('Reschedule', item.title)}
          />
        </div>

      </div>
    </AppShell>
  );
}