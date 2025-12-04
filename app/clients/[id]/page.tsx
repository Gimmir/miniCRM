'use client';

import React, { use } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  ChevronLeft, 
  Clock, 
  Wallet, 
  Scissors,
  StickyNote,
  Pencil
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BaseLayout } from '@/components/layout';
import { SectionTitle, StatusIcon } from '@/components/ui';

// Мокові дані для прикладу
const clientData = {
  id: '1',
  name: 'Іван Петренко',
  phone: '+380 50 123 4567',
  username: '@ivan_petrenko',
  avatarColor: 'bg-blue-100 text-blue-700',
  notes: 'Любить каву з молоком. Алергія на лак сильної фіксації. Завжди записується на ранок.',
  stats: {
    totalVisits: 12,
    totalSpent: '5 200 ₴',
    avgCheck: '433 ₴'
  },
  history: [
    { 
      id: '101', 
      date: '10 Жов 2023', 
      time: '14:00', 
      service: 'Чоловіча стрижка', 
      price: '400 ₴', 
      status: 'confirmed',
      duration: '45 хв'
    },
    { 
      id: '102', 
      date: '15 Вер 2023', 
      time: '10:30', 
      service: 'Стрижка бороди', 
      price: '300 ₴', 
      status: 'confirmed',
      duration: '30 хв'
    },
    { 
      id: '103', 
      date: '20 Сер 2023', 
      time: '11:00', 
      service: 'Комплекс (Стрижка + Борода)', 
      price: '650 ₴', 
      status: 'confirmed',
      duration: '1 год 15 хв'
    },
    { 
      id: '104', 
      date: '05 Лип 2023', 
      time: '16:45', 
      service: 'Чоловіча стрижка', 
      price: '400 ₴', 
      status: 'cancelled',
      duration: '45 хв'
    }
  ]
} as const;

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  console.log('Client ID:', id);

  const initials = clientData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <BaseLayout>
      {/* FIX: Використовуємо h-[100dvh] та overflow-hidden для контейнера.
        Це ізолює сторінку від скролу браузера, запобігаючи "стрибанню" хедерів.
      */}
      <div className="flex-1 w-full md:pl-72 flex flex-col h-[100dvh] overflow-hidden relative bg-[#fafafa]">
        
        {/* FIX: Хедер тепер не sticky, а shrink-0. 
          Він стоїть статично зверху, бо скролиться тільки блок <main> нижче.
        */}
        <header className="shrink-0 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 active:scale-95 transition-all shadow-sm hover:text-slate-900 hover:border-slate-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Профіль клієнта</h1>
            </div>
          </div>

          <button 
            onClick={() => console.log('Edit client')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 active:scale-95 transition-all shadow-sm hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </header>

        {/* FIX: overflow-y-auto перенесено сюди. 
          overscroll-y-contain запобігає передачі скролу батьківському елементу (rubber-banding ефект тільки тут).
        */}
        <main className="flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-10 w-full max-w-7xl mx-auto pb-24 md:pb-10 space-y-5">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ${clientData.avatarColor}`}>
                  {initials}
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">{clientData.name}</h1>
                  <p className="text-sm font-medium text-slate-500 mb-0.5">{clientData.phone}</p>
                  {clientData.username && (
                    <p className="text-xs text-blue-500 font-medium">{clientData.username}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
              <button className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20">
                <Phone className="w-4 h-4" />
                Подзвонити
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all hover:bg-blue-100">
                <MessageCircle className="w-4 h-4" />
                Написати
              </button>
            </div>

            {/* Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          </div>

          {/* Notes - Moved to Top */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 flex gap-3 relative overflow-hidden">
            <StickyNote className="w-5 h-5 text-amber-500 shrink-0 relative z-10" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Важливі нотатки</h4>
              <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                {clientData.notes}
              </p>
            </div>
            {/* Decor for notes */}
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-100 rounded-full blur-xl opacity-50 pointer-events-none"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Calendar className="w-5 h-5 text-blue-500 mb-2 opacity-80" />
              <span className="text-lg font-bold text-slate-900 leading-none mb-1">{clientData.stats.totalVisits}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Візитів</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Wallet className="w-5 h-5 text-emerald-500 mb-2 opacity-80" />
              <span className="text-lg font-bold text-slate-900 leading-none mb-1">{clientData.stats.totalSpent}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Всього</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Scissors className="w-5 h-5 text-purple-500 mb-2 opacity-80" />
              <span className="text-lg font-bold text-slate-900 leading-none mb-1">{clientData.stats.avgCheck}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Сер. чек</span>
            </div>
          </div>

          {/* History Section */}
          <div className="pt-2">
            <SectionTitle title="Історія візитів" />
            <div className="space-y-3">
              {clientData.history.map((visit) => (
                <div 
                  key={visit.id} 
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3 group active:bg-slate-50 transition-colors cursor-pointer select-none"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-xs flex-col leading-none border border-slate-100 shrink-0">
                        <span className="block mb-0.5 text-sm text-slate-800">{visit.date.split(' ')[0]}</span>
                        <span className="text-[9px] uppercase tracking-wide">{visit.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{visit.service}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded">
                            <Clock className="w-3 h-3" />
                            {visit.time}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{visit.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-sm font-bold text-slate-900">{visit.price}</span>
                      <StatusIcon status={visit.status as 'confirmed' | 'cancelled'} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </BaseLayout>
  );
}