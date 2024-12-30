import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

type LoadingItemProps = {
  label: string;
  done: boolean;
};

export function LoadingItem({ label, done }: LoadingItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-white">
      <span className="text-sm">{label}</span>
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-green-400" />
      ) : (
        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
      )}
    </div>
  );
}