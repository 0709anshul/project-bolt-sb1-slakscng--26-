import React from 'react';
import { LucideIcon } from 'lucide-react';

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

export function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}