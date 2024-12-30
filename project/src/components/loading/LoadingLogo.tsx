import React from 'react';
import { Logo } from '../Logo';

export function LoadingLogo() {
  return (
    <div className="flex items-center gap-3">
      <Logo />
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-white leading-none">Leumasware®</h1>
        <p className="text-sm text-indigo-200 leading-none">ISO 9001:2015 Company</p>
      </div>
    </div>
  );
}