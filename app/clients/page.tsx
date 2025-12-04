'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, ArrowDownUp } from 'lucide-react';
import { AppShell } from '@/components/layout';
import { ContactList } from '@/components/contacts';
import { useRouter } from 'next/navigation';

type SortOption = 'alphabetical' | 'recent' | 'oldest';

const mockContacts = [
  {
    id: '4',
    name: 'Андрій Бойко',
    phone: '+380 99 111 2222',
    lastVisit: '25.09.2023',
    lastVisitDate: '2023-09-25',
    avatarColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: '1',
    name: 'Іван Петренко',
    phone: '+380 50 123 4567',
    lastVisit: '10.10.2023',
    lastVisitDate: '2023-10-10',
    avatarColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: '2',
    name: 'Марія Коваленко',
    phone: '+380 67 987 6543',
    lastVisit: '01.11.2023',
    lastVisitDate: '2023-11-01',
    avatarColor: 'bg-pink-100 text-pink-700'
  },
  {
    id: '3',
    name: 'Олена Сидоренко',
    phone: '+380 63 555 1234',
    lastVisit: 'Сьогодні',
    lastVisitDate: new Date().toISOString().split('T')[0],
    avatarColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: '5',
    name: 'Тетяна Мельник',
    phone: '+380 93 333 4444',
    lastVisit: '-',
    lastVisitDate: null,
    avatarColor: 'bg-orange-100 text-orange-700'
  }
];

export default function ClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('alphabetical');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const filteredAndSortedContacts = useMemo(() => {
    let result = mockContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    result.sort((a, b) => {
      switch (sortOrder) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'recent':
          if (!a.lastVisitDate) return 1;
          if (!b.lastVisitDate) return -1;
          return (
            new Date(b.lastVisitDate).getTime() -
            new Date(a.lastVisitDate).getTime()
          );
        case 'oldest':
          if (!a.lastVisitDate) return 1;
          if (!b.lastVisitDate) return -1;
          return (
            new Date(a.lastVisitDate).getTime() -
            new Date(b.lastVisitDate).getTime()
          );
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, sortOrder]);

  const handleContactClick = (contact: any) => {
    router.push(`/clients/${contact.id}`);
  };

  const toggleSort = () => setIsSortMenuOpen(!isSortMenuOpen);
  const selectSort = (option: SortOption) => {
    setSortOrder(option);
    setIsSortMenuOpen(false);
  };

  return (
    <AppShell title="Клієнти">
      <div className="animate-in fade-in duration-500 pb-20 space-y-6">
        <div className="flex gap-3 px-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук..."
              /* FIX: Змінено 'text-sm' на 'text-base md:text-sm'. 
                 Це встановлює розмір шрифту 16px на мобільних, що запобігає авто-зуму в Safari iOS.
                 На десктопі (md:) шрифт повернеться до меншого розміру.
              */
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-12 flex items-center justify-center shadow-md shadow-blue-500/20 active:scale-95 transition-all shrink-0">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1 relative">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Клієнти ({filteredAndSortedContacts.length})
            </h3>

            <button
              onClick={toggleSort}
              className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              <span>
                {sortOrder === 'alphabetical'
                  ? 'А-Я'
                  : sortOrder === 'recent'
                  ? 'Недавні'
                  : 'Давні'}
              </span>
            </button>

            {isSortMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSortMenuOpen(false)}
                ></div>
                <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <button
                    onClick={() => selectSort('alphabetical')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${
                      sortOrder === 'alphabetical'
                        ? 'text-blue-600 font-bold bg-blue-50/50'
                        : 'text-slate-600'
                    }`}
                  >
                    За алфавітом
                  </button>
                  <button
                    onClick={() => selectSort('recent')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${
                      sortOrder === 'recent'
                        ? 'text-blue-600 font-bold bg-blue-50/50'
                        : 'text-slate-600'
                    }`}
                  >
                    Спочатку недавні
                  </button>
                  <button
                    onClick={() => selectSort('oldest')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${
                      sortOrder === 'oldest'
                        ? 'text-blue-600 font-bold bg-blue-50/50'
                        : 'text-slate-600'
                    }`}
                  >
                    Спочатку давні
                  </button>
                </div>
              </>
            )}
          </div>

          <ContactList
            contacts={filteredAndSortedContacts}
            onContactClick={handleContactClick}
          />
        </div>
      </div>
    </AppShell>
  );
}