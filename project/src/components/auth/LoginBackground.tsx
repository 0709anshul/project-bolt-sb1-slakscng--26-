import React from 'react';

export function LoginBackground() {
  return (
    <div 
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url(/assets/images/machine-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-indigo-900/90" />
    </div>
  );
}