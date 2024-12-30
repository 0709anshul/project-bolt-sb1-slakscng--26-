import React from 'react';

type SplitOrderConnectionProps = {
  isFirst: boolean;
  isLast: boolean;
  isParent: boolean;
};

export function SplitOrderConnection({ isFirst, isLast, isParent }: SplitOrderConnectionProps) {
  return (
    <div className="relative flex items-center">
      {/* Vertical connection line */}
      <div 
        className={`absolute left-1/2 w-0.5 bg-indigo-100 transform -translate-x-1/2 ${
          isFirst ? 'h-1/2 bottom-0' : isLast ? 'h-1/2 top-0' : 'h-full'
        }`}
      />
      
      {/* Connection dot with animation */}
      <div 
        className={`w-3 h-3 rounded-full z-10 transition-colors duration-200
          ${isParent 
            ? 'bg-indigo-400 ring-2 ring-indigo-100' 
            : 'bg-indigo-200 group-hover:bg-indigo-300'
          }`}
      />

      {/* Horizontal connection line */}
      <div className="w-4 h-0.5 bg-indigo-100 ml-1" />
    </div>
  );
}