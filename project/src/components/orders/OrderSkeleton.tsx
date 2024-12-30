import React from 'react';

export function OrderSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-4">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}