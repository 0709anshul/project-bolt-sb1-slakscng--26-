import React from 'react';
import { LoadingLogo } from './LoadingLogo';
import { LoadingAnimation } from './LoadingAnimation';

type LoadingScreenProps = {
  initializing?: boolean;
};

export function LoadingScreen({ initializing = false }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-indigo-900 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <LoadingLogo />
        <LoadingAnimation />
        <div className="text-white text-sm font-medium">
          {initializing ? 'Initializing...' : 'Loading...'}
        </div>
      </div>
    </div>
  );
}