import React from 'react';
import { Split } from 'lucide-react';
import { cn } from '../../../lib/utils/styles';

type SplitIconProps = {
  isSplit?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function SplitIcon({ isSplit, onClick, className, disabled }: SplitIconProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isSplit}
      className={cn(
        'p-2 rounded-full transition-all duration-300',
        isSplit && [
          'bg-indigo-100 text-indigo-600',
          'animate-[pulse_2s_ease-in-out_infinite]',
          'hover:bg-indigo-200'
        ],
        !isSplit && !disabled && 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      title={disabled ? 'Only Leumas staff can split orders' : (isSplit ? 'Split Order' : 'Split this order')}
    >
      <Split 
        className={cn(
          'h-5 w-5 transition-transform duration-300',
          isSplit && 'rotate-180'
        )}
      />
    </button>
  );
}