'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Users, Settings, LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  href: string;
  icon: LucideIcon;
  label: string;
}

export const defaultNavItems: NavItem[] = [
  { id: 'home', href: '/', icon: Home, label: 'Головна' },
  { id: 'calendar', href: '/calendar', icon: Calendar, label: 'Календар' },
  { id: 'clients', href: '/clients', icon: Users, label: 'Клієнти' },
  { id: 'profile', href: '/profile', icon: Settings, label: 'Профіль' },
];

interface SidebarProps {
  navItems?: NavItem[];
  user?: {
    first_name?: string;
  } | null;
}

export const Sidebar = ({ 
  navItems = defaultNavItems, 
  user 
}: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 fixed h-full z-20 shadow-[2px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-600/20">
            B
          </div>
          <div>
            <span className="font-bold text-lg leading-none block">BeautyBot</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">CRM System</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center gap-3.5 w-full p-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-slate-700 font-bold shrink-0 border border-slate-200 shadow-sm">
            {user?.first_name?.[0]}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">{user?.first_name}</span>
            <span className="text-xs text-slate-400">Адміністратор</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
