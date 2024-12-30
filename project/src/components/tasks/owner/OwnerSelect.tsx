import React, { useState } from 'react';
import { useAvailableOwners } from '../../../hooks/useAvailableOwners';
import { useTaskOwner } from '../../../hooks/useTaskOwner';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { SaveButton } from '../../common/SaveButton';
import { User2 } from 'lucide-react';
import type { Task } from '../../../types/orders';

type OwnerSelectProps = {
  task: Task;
};

export function OwnerSelect({ task }: OwnerSelectProps) {
  const { owners, isLoading: loadingOwners, error: ownersError } = useAvailableOwners();
  const { updateOwner, isLoading: updatingOwner, error: updateError, canUpdateOwner } = useTaskOwner(task);
  const [selectedOwnerId, setSelectedOwnerId] = useState(task.owner_id);

  const isLoading = loadingOwners || updatingOwner;
  const error = ownersError || updateError;
  const hasChanges = selectedOwnerId !== task.owner_id;

  const handleSave = async () => {
    try {
      await updateOwner(selectedOwnerId);
    } catch (err) {
      console.error('Failed to update owner:', err);
    }
  };

  if (loadingOwners) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-sm text-red-600">{error.message}</div>;
  }

  // Read-only view for non-admin/manager users
  if (!canUpdateOwner) {
    const owner = owners?.find(u => u.id === task.owner_id);
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Owner</label>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User2 className="h-4 w-4 text-gray-400" />
          <span>{owner?.full_name || 'Unassigned'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Owner</label>
        {hasChanges && (
          <SaveButton 
            onClick={handleSave}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <User2 className="h-4 w-4 text-gray-400" />
        <select
          value={selectedOwnerId || ''}
          onChange={(e) => setSelectedOwnerId(e.target.value || null)}
          disabled={isLoading}
          className={`
            block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <option value="">Unassigned</option>
          {owners?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.full_name} ({user.organization.name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}