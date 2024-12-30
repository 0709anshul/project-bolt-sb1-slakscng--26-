import React from 'react';
import { Factory } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="relative">
      <Factory className="h-16 w-16 text-indigo-400 animate-bounce mx-auto" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent" />
    </div>
  );
}