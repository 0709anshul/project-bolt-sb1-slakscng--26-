import React from 'react';
import { Logo } from '../Logo';

export function SidebarHeader() {
  return (
    <div className="flex-shrink-0 p-4 border-b border-indigo-700">
      <div className="flex items-center gap-3">
        <Logo />
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold leading-none">Leumasware®</h1>
          <p className="text-xs text-indigo-200 leading-none">ISO 9001:2015 Company</p>
        </div>
      </div>
    </div>
  );
}