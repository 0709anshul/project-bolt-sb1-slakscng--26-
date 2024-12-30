import React, { useState } from 'react';
import { useTogglePriority } from '../../hooks/useTogglePriority';

type PriorityToggleProps = {
  orderId: string;
  isPriority: boolean;
};

export function PriorityToggle({ orderId, isPriority }: PriorityToggleProps) {
  const { togglePriority, isLoading, canToggle } = useTogglePriority();
  const [optimisticValue, setOptimisticValue] = useState(isPriority);

  const handleToggle = async () => {
    if (!canToggle || isLoading) return;

    const newValue = !optimisticValue;
    setOptimisticValue(newValue);

    try {
      await togglePriority(orderId, isPriority);
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticValue(isPriority);
      console.error('Error toggling priority:', error);
    }
  };

  // Keep optimistic value in sync with prop when it changes from outside
  React.useEffect(() => {
    setOptimisticValue(isPriority);
  }, [isPriority]);

  return (
    <button
      onClick={handleToggle}
      disabled={!canToggle || isLoading}
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full transition-colors
        ${!canToggle ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${optimisticValue 
          ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
        ${isLoading ? 'animate-pulse' : ''}
      `}
      title={!canToggle ? 'Only admins and managers can change priority' : undefined}
    >
      <span className="relative flex h-2 w-2">
        <span className={`
          animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
          ${optimisticValue ? 'bg-indigo-500' : 'bg-gray-500'}
        `} />
        <span className={`
          relative inline-flex rounded-full h-2 w-2
          ${optimisticValue ? 'bg-indigo-500' : 'bg-gray-500'}
        `} />
      </span>
      <span className="text-sm font-medium">
        {isLoading ? 'Updating...' : (optimisticValue ? 'Priority' : 'Normal')}
      </span>
    </button>
  );
}