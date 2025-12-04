'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ScheduleItem, ScheduleItemProps } from './ScheduleItem';
import { SectionTitle } from '../ui/SectionTitle';

interface ScheduleListProps {
  items: Omit<
    ScheduleItemProps,
    'onCall' | 'onMessage' | 'onReschedule' | 'onDetails'
  >[];
  title?: string;
  onViewAll?: () => void;
  onItemCall?: (item: ScheduleItemProps) => void;
  onItemMessage?: (item: ScheduleItemProps) => void;
  onItemReschedule?: (item: ScheduleItemProps) => void;
  onItemDetails?: (item: ScheduleItemProps) => void;
}

export const ScheduleList = ({
  items,
  title = 'Сьогоднішній розклад',
  onViewAll,
  onItemCall,
  onItemMessage,
  onItemReschedule,
  onItemDetails
}: ScheduleListProps) => {
  return (
    <div className="min-w-0">
      <SectionTitle
        title={title}
        action={
          onViewAll && (
            <button
              onClick={onViewAll}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md transition-colors uppercase tracking-wide"
            >
              Всі події
            </button>
          )
        }
      />

      <div className="flex flex-col">
        {items.map((item, index) => (
          <ScheduleItem
            key={`${item.time}-${item.client}-${index}`}
            {...item}
            onDetails={() => onItemDetails?.(item as ScheduleItemProps)}
            onCall={() => onItemCall?.(item as ScheduleItemProps)}
            onMessage={() => onItemMessage?.(item as ScheduleItemProps)}
            onReschedule={() => onItemReschedule?.(item as ScheduleItemProps)}
          />
        ))}

        {items.length === 0 && (
          <div className="mt-4 text-center p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-slate-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <span className="text-xs font-medium">
              На сьогодні більше немає записів
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
