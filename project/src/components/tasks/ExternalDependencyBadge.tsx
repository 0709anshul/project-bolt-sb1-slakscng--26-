import React from 'react';
import { AlertCircle } from 'lucide-react';

type ExternalDependencyBadgeProps = {
  hasExternalDependency: boolean;
};

export function ExternalDependencyBadge({ hasExternalDependency }: ExternalDependencyBadgeProps) {
  if (!hasExternalDependency) return null;

  return (
    <div className="group relative inline-flex items-center">
      <div className="relative">
        {/* Pulsing background effect */}
        <div className="absolute inset-0 rounded-full bg-red-200 animate-ping opacity-75" />
        
        {/* Icon with glow effect */}
        <div className="relative z-10 p-1 rounded-full bg-red-100 shadow-lg ring-2 ring-red-400 animate-[bounce_2s_ease-in-out_infinite]">
          <AlertCircle className="h-4 w-4 text-red-500" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl transition-opacity duration-200 opacity-0 group-hover:opacity-100">
        <div className="font-medium mb-1">External Dependency</div>
        <p className="text-gray-300 text-xs">
          Involves external vendors/dependencies and hence timelines may vary despite best efforts
        </p>
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}