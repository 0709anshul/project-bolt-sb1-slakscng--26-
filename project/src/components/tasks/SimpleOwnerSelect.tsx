import React from 'react';
import { useLeumas } from '../../hooks/useLeumas';
import { useUserRole } from '../../hooks/useUserRole';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { User2 } from 'lucide-react';
import type { Task } from '../../types/orders';

type SimpleOwnerSelectProps = {
  task: Task;
  onUpdate?: () => void;
};

export function SimpleOwnerSelect({ task, onUpdate }: SimpleOwnerSelectProps) {
  const { staff, isLoading } = useLeumas();
  const { isAdmin, isManager } = useUserRole();
  const canAssignOwner = isAdmin || isManager;

  const handleOwnerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ owner_id: e.target.value || null })
        .eq('id', task.id);

      if (error) throw error;
      onUpdate?.();
    } catch (err) {
      console.error('Failed to update task owner:', err);
    }
  };

  if (!canAssignOwner) {
    const owner = staff?.find(u => u.id === task.owner_id);
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <User2 className="h-4 w-4" />
        <span>{owner?.full_name || 'Unassigned'}</span>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Owner</label>
      <select
        value={task.owner_id || ''}
        onChange={handleOwnerChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Unassigned</option>
        {staff?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name} ({user.role})
          </option>
        ))}
      </select>
    </div>
  );
}