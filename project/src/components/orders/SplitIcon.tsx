import React from 'react';
import { Split } from 'lucide-react';

type SplitIconProps = {
  isSplit?: boolean;
  onClick?: () => void;
  className?: string;
};

export function SplitIcon({ isSplit, onClick, className = '' }: SplitIconProps) {
  return (
    <button
      onClick={onClick}
      disabled={isSplit}
      className={`p-2 rounded-full transition-all duration-300 ${
        isSplit 
          ? 'bg-indigo-100 text-indigo-600 animate-[pulse_2s_ease-in-out_infinite] hover:bg-indigo-200' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      } ${className}`}
      title={isSplit ? 'Split Order' : 'Split this order'}
    >
      <Split 
        className={`h-5 w-5 transition-transform duration-300 ${
          isSplit ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}