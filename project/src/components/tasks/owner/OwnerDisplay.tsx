import React from 'react';
import { User2 } from 'lucide-react';
import type { User } from '../../../types/users';

type OwnerDisplayProps = {
  owner: User | null;
  className?: string;
};

export function OwnerDisplay({ owner, className = '' }: OwnerDisplayProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <User2 className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-600">
        {owner ? `${owner.full_name} (${owner.organization?.name})` : 'Unassigned'}
      </span>
    </div>
  );
}