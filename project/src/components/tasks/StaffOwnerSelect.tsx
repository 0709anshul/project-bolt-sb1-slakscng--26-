import React from 'react';
import { useStaffUsers } from '../../hooks/useStaffUsers';
import { useUserRole } from '../../hooks/useUserRole';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { User2 } from 'lucide-react';
import type { Task } from '../../types/orders';

type StaffOwnerSelectProps = {
  task: Task;
  onUpdate?: () => void;
};

export function StaffOwnerSelect({ task, onUpdate }: StaffOwnerSelectProps) {
  const { users, isLoading, error } = useStaffUsers();
  const { isAdmin, isManager } = useUserRole();
  const canAssignOwner = isAdmin || isManager;

  const handleOwnerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ owner_id: e.target.value || null })
        .eq('id', task.id);

      if (updateError) throw updateError;
      onUpdate?.();
    } catch (err) {
      console.error('Failed to update task owner:', err);
    }
  };

  // Read-only view for non-admin/manager users
  if (!canAssignOwner) {
    const owner = users?.find(u => u.id === task.owner_id);
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

  if (error) {
    return <div className="text-sm text-red-600">{error.message}</div>;
  }

  const currentOwner = users?.find(u => u.id === task.owner_id);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Owner</label>
      <select
        value={currentOwner?.id || ''}
        onChange={handleOwnerChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Unassigned</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name} ({user.role})
          </option>
        ))}
      </select>
    </div>
  );
}