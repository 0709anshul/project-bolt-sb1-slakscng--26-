import React from 'react';
import { Flag } from 'lucide-react';
import { useTogglePriority } from '../../hooks/useTogglePriority';
import { useUserRole } from '../../hooks/useUserRole';

type PriorityFlagProps = {
  orderId: string;
  isPriority: boolean;
};

export function PriorityFlag({ orderId, isPriority }: PriorityFlagProps) {
  const { togglePriority, isLoading } = useTogglePriority();
  const { isAdmin, isManager } = useUserRole();
  const canToggle = isAdmin || isManager;

  const handleClick = async () => {
    if (canToggle && !isLoading) {
      try {
        await togglePriority(orderId, isPriority);
      } catch (error) {
        console.error('Error toggling priority:', error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!canToggle || isLoading}
      className={`p-2 rounded-full transition-colors ${
        isPriority 
          ? 'text-red-600 hover:bg-red-50' 
          : 'text-gray-400 hover:bg-gray-50'
      } ${!canToggle ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      title={`${isPriority ? 'Priority' : 'Normal Priority'}${!canToggle ? ' (Requires admin/manager access)' : ''}`}
    >
      <Flag 
        className={`h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`}
        fill={isPriority ? 'currentColor' : 'none'}
      />
    </button>
  );
}