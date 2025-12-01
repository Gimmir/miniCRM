'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem, defaultNavItems } from './Sidebar';

interface MobileNavProps {
  navItems?: NavItem[];
}

export const MobileNav = ({ 
  navItems = defaultNavItems 
}: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 pb-safe z-50 h-[76px] flex justify-between items-stretch px-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link 
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 select-none ${
              isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`
              p-1.5 rounded-xl transition-all duration-300
              ${isActive ? 'bg-blue-50 -translate-y-1' : ''}
            `}>
              <item.icon 
                className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className={`text-[10px] leading-none transition-all duration-300 ${isActive ? 'font-bold opacity-100' : 'font-medium opacity-80'}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
