'use client';

import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

interface StatusIconProps {
  status: 'confirmed' | 'cancelled';
}

export const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === 'cancelled') {
    return <XCircle className="w-5 h-5 text-red-500" />;
  }
  return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
};
