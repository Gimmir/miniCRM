'use client';

import React from 'react';

interface SectionTitleProps {
  title: string;
  action?: React.ReactNode;
}

export const SectionTitle = ({ title, action }: SectionTitleProps) => (
  <div className="flex items-center justify-between px-1 mb-3 md:mb-4">
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</h3>
    {action}
  </div>
);
