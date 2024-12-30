import React from 'react';
import { useOrganizationUsers } from '../../hooks/useOrganizationUsers';
import { useUserRole } from '../../hooks/useUserRole';
import { SaveButton } from '../common/SaveButton';
import { useTaskField } from '../../hooks/useTaskField';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Task } from '../../types/orders';

type OwnerSelectProps = {
  task: Task;
};

export function OwnerSelect({ task }: OwnerSelectProps) {
  const { data: users, isLoading: loadingUsers } = useOrganizationUsers(task.production_order?.organization_id);
  const { isAdmin, isManager } = useUserRole();
  const canAssignOwner = isAdmin || isManager;

  const {
    value: ownerId,
    setValue: setOwnerId,
    save,
    isLoading: savingOwner,
    error,
    hasChanges
  } = useTaskField<string | null>(task.id, 'owner_id', task.owner_id);

  if (!canAssignOwner) {
    const owner = users?.find(user => user.id === task.owner_id);
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Owner</label>
        <div className="text-sm text-gray-600">
          {owner?.full_name || 'Unassigned'}
        </div>
      </div>
    );
  }

  if (loadingUsers) {
    return <LoadingSpinner />;
  }

  const isLoading = loadingUsers || savingOwner;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Owner</label>
        {hasChanges && (
          <SaveButton 
            onClick={save}
            isLoading={isLoading}
          />
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600">{error.message}</div>
      )}

      <select
        value={ownerId || ''}
        onChange={(e) => setOwnerId(e.target.value || null)}
        disabled={isLoading}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Unassigned</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}