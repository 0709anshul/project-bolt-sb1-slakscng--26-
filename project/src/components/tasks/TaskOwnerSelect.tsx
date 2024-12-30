import React from 'react';
import { useTaskOwners } from '../../hooks/useTaskOwners';
import { useUserRole } from '../../hooks/useUserRole';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { User2 } from 'lucide-react';
import type { Task } from '../../types/orders';

type TaskOwnerSelectProps = {
  task: Task;
  onUpdate?: () => void;
};

export function TaskOwnerSelect({ task, onUpdate }: TaskOwnerSelectProps) {
  const { owners, isLoading } = useTaskOwners();
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
    const owner = owners?.find(u => u.id === task.owner_id);
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
    <select
      value={task.owner_id || ''}
      onChange={handleOwnerChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="">Unassigned</option>
      {owners?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.full_name} ({user.role})
        </option>
      ))}
    </select>
  );
}