'use client';

import React, { use, useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  ChevronLeft, 
  Clock, 
  Wallet, 
  Scissors,
  StickyNote,
  Pencil,
  Check,
  X,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BaseLayout } from '@/components/layout';
import { SectionTitle, StatusIcon } from '@/components/ui';

// Типізація для візиту
interface Visit {
  id: string;
  date: string;
  time: string;
  service: string;
  price: string;
  status: string;
  duration: string;
}

// Мокові дані
const initialClientData = {
  id: '1',
  name: 'Іван Петренко',
  phone: '+380501234567', // Зберігаємо без пробілів для tel:
  displayPhone: '+380 50 123 4567',
  username: 'ivan_petrenko', // Без @ для посилання
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
};

// --- КОМПОНЕНТ ЕЛЕМЕНТА ЗІ СВАЙПОМ ---
const SwipeableVisitItem = ({ visit, onDelete }: { visit: Visit; onDelete: () => void }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setOffsetX(0);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (diff < 0) {
      const newOffset = Math.max(diff, -80); 
      setOffsetX(newOffset);
    } else if (offsetX < 0) {
      setOffsetX(Math.min(offsetX + diff, 0));
    }
  };

  const handleTouchEnd = () => {
    if (offsetX < -30) {
      setOffsetX(-60);
    } else {
      setOffsetX(0);
    }
    setStartX(null);
  };

  return (
    <div ref={itemRef} className="relative overflow-hidden rounded-xl mb-3 select-none group">
      <div className="absolute inset-0 bg-red-500 rounded-xl flex items-center justify-end">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center justify-center text-white h-full w-[60px] active:opacity-70 transition-opacity"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      <div 
        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative z-10 transition-transform duration-200 ease-out active:scale-[0.98] active:bg-slate-50"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-start pointer-events-none">
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
    </div>
  );
};

// --- ГОЛОВНА СТОРІНКА ---
export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [clientData, setClientData] = useState(initialClientData);
  
  const [formData, setFormData] = useState({
    name: clientData.name,
    phone: clientData.displayPhone,
    username: clientData.username,
    notes: clientData.notes
  });

  const handleEditClick = () => {
    setFormData({
      name: clientData.name,
      phone: clientData.displayPhone,
      username: clientData.username,
      notes: clientData.notes
    });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Тут ми симулюємо очистку номера телефону для зберігання
    const cleanPhone = formData.phone.replace(/\s/g, '');
    
    setClientData({
      ...clientData,
      name: formData.name,
      phone: cleanPhone,
      displayPhone: formData.phone,
      username: formData.username.replace('@', ''),
      notes: formData.notes
    });
    setIsEditing(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${clientData.phone}`;
  };

  const handleMessage = () => {
    // Відкриваємо Telegram за номером телефону
    // Формат t.me/+380XXXXXXXXX
    const cleanPhone = clientData.phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
    window.open(`https://t.me/${cleanPhone}`, '_blank');
  };

  const handleDeleteVisit = (visitId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цей запис?')) {
      setClientData(prev => ({
        ...prev,
        history: prev.history.filter(item => item.id !== visitId)
      }));
    }
  };

  const handleDeleteClient = () => {
    if (confirm('Ви впевнені, що хочете видалити цього клієнта? Цю дію неможливо скасувати.')) {
      console.log('Delete client:', id);
      router.replace('/clients');
    }
  };

  const initials = clientData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <BaseLayout>
      <div className="flex-1 w-full md:pl-72 flex flex-col h-[100dvh] overflow-hidden relative bg-[#fafafa]">
        
        <header className="shrink-0 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => isEditing ? handleCancelClick() : router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 active:scale-95 transition-all shadow-sm hover:text-slate-900 hover:border-slate-300"
            >
              {isEditing ? <X className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">
                {isEditing ? 'Редагування' : 'Профіль клієнта'}
              </h1>
            </div>
          </div>

          {isEditing ? (
            <button 
              onClick={handleSaveClick}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 text-white border border-emerald-600 active:scale-95 transition-all shadow-md hover:bg-emerald-600"
            >
              <Check className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleEditClick}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 active:scale-95 transition-all shadow-sm hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-10 w-full max-w-7xl mx-auto pb-32 md:pb-10 space-y-5">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex gap-4 w-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm shrink-0 ${clientData.avatarColor}`}>
                  {initials}
                </div>
                
                <div className="flex flex-col justify-center min-w-0 w-full">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Ім'я та прізвище</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="Введіть ім'я"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Телефон</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="+380..."
                        />
                      </div>
                      {/* Telegram username input removed since we use phone number */}
                    </div>
                  ) : (
                    <>
                      <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">{clientData.name}</h1>
                      <p className="text-sm font-medium text-slate-500 mb-0.5">{clientData.displayPhone}</p>
                      {/* Username display removed */}
                    </>
                  )}
                </div>
              </div>
            </div>

            {!isEditing && (
              <div className="grid grid-cols-2 gap-3 mt-6 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button 
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20"
                >
                  <Phone className="w-4 h-4" />
                  Подзвонити
                </button>
                <button 
                  onClick={handleMessage}
                  className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all hover:bg-blue-100"
                >
                  <MessageCircle className="w-4 h-4" />
                  Написати
                </button>
              </div>
            )}

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          </div>

          <div className={`bg-amber-50/60 border border-amber-100 rounded-xl p-4 flex gap-3 relative overflow-hidden transition-all duration-300 ${isEditing ? 'ring-2 ring-amber-200 bg-white' : ''}`}>
            <StickyNote className="w-5 h-5 text-amber-500 shrink-0 relative z-10 mt-0.5" />
            <div className="relative z-10 w-full">
              <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Важливі нотатки</h4>
              
              {isEditing ? (
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 min-h-[80px] resize-none"
                  placeholder="Додайте нотатку про клієнта..."
                />
              ) : (
                <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                  {clientData.notes || "Немає нотаток"}
                </p>
              )}
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-100 rounded-full blur-xl opacity-50 pointer-events-none"></div>
          </div>

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

          <div className="pt-2">
            <SectionTitle title="Історія візитів" />
            <div className="space-y-1">
              {clientData.history.length > 0 ? (
                clientData.history.map((visit) => (
                  <SwipeableVisitItem 
                    key={visit.id}
                    visit={visit as Visit}
                    onDelete={() => handleDeleteVisit(visit.id)}
                  />
                ))
              ) : (
                <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-slate-400">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Історія візитів порожня</p>
                </div>
              )}
            </div>
          </div>

        </main>

        {isEditing && (
          <div className="fixed bottom-0 right-0 left-0 md:left-72 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 pb-safe z-[60] animate-in slide-in-from-bottom-full duration-200 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
             <div className="max-w-7xl mx-auto">
                <button 
                  onClick={handleDeleteClient}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-all shadow-sm hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                  Видалити клієнта
                </button>
             </div>
          </div>
        )}

      </div>
    </BaseLayout>
  );
}