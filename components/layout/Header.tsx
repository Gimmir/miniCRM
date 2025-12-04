'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  user?: {
    first_name?: string;
  } | null;
  title?: string;
  onSearch?: () => void;
  onNotifications?: () => void;
}

export const Header = ({ 
  user, 
  title = 'Панель керування',
  onSearch,
  onNotifications
}: HeaderProps) => {
  return (
    <>
      {/* FIX: Змінено 'sticky' на 'fixed'. 
        Це гарантує, що хедер не буде сповзати при rubber-banding ефектах на iOS.
        Додано left-0 right-0 та md:left-72 (щоб не перекривати сайдбар на десктопі).
      */}
      <header className="fixed top-0 left-0 right-0 md:left-72 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between transition-all duration-200">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3">
          <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
            {user?.first_name?.[0]}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Привіт,</span>
            <h1 className="font-bold text-lg leading-none truncate">{user?.first_name}</h1>
          </div>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSearch}
            className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full text-slate-500 transition-all hover:shadow-sm hover:text-slate-900 active:scale-95"
          >
            <Search className="h-5 w-5" />
          </button>
          <button 
            onClick={onNotifications}
            className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full text-slate-500 transition-all hover:shadow-sm hover:text-slate-900 active:scale-95 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>
      
      {/* FIX: Spacer div. 
        Оскільки хедер тепер fixed (вирваний з потоку), цей блок займає його місце по висоті,
        щоб контент не ховався під хедером. Висота підібрана під висоту хедера (64px моб / 88px деск).
      */}
      <div className="h-[64px] md:h-[88px] w-full shrink-0" aria-hidden="true" />
    </>
  );
};