import React from 'react';
import { LogOut } from 'lucide-react';
import { useSignOut } from '../hooks/useSignOut';

export function SignOutButton() {
  const { signOut, isLoading } = useSignOut();

  return (
    <button
      onClick={signOut}
      disabled={isLoading}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
    >
      <LogOut className="h-5 w-5" />
      <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
    </button>
  );
}