import React from 'react';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import type { User } from '../../../types/users';

type OwnerDropdownProps = {
  selectedOwnerId: string | undefined | null;
  users: User[] | null;
  onChange: (userId: string | null) => void;
  disabled?: boolean;
};

export function OwnerDropdown({ 
  selectedOwnerId, 
  users,
  onChange,
  disabled 
}: OwnerDropdownProps) {
  // Validate selectedOwnerId exists in users list
  const validSelectedId = selectedOwnerId && users?.some(u => u.id === selectedOwnerId)
    ? selectedOwnerId
    : '';

  return (
    <div className="relative">
      <select
        value={validSelectedId}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || !users}
        className={`
          mt-1 block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        <option value="">Unassigned</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name} ({user.organization.name})
          </option>
        ))}
      </select>
      {disabled && (
        <div className="absolute inset-y-0 right-8 flex items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}