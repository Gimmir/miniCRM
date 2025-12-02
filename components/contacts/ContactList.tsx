'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { ContactItem, ContactItemProps } from './ContactItem';

interface ContactListProps {
  contacts: Omit<ContactItemProps, 'onClick' | 'onCall' | 'onMessage'>[];
  onContactClick?: (contact: ContactItemProps) => void;
  onContactCall?: (contact: ContactItemProps) => void;
  onContactMessage?: (contact: ContactItemProps) => void;
}

export const ContactList = ({
  contacts,
  onContactClick,
  onContactCall,
  onContactMessage
}: ContactListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id}
          {...contact}
          onClick={() => onContactClick?.(contact as ContactItemProps)}
          onCall={() => onContactCall?.(contact as ContactItemProps)}
          onMessage={() => onContactMessage?.(contact as ContactItemProps)}
        />
      ))}
      
      {contacts.length === 0 && (
        <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-slate-400">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">Клієнтів не знайдено</p>
          <p className="text-xs mt-1">Спробуйте змінити пошуковий запит</p>
        </div>
      )}
    </div>
  );
};