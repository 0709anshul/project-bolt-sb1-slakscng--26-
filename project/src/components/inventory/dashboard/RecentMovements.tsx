import React from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { useInventoryMovements } from '../../../hooks/inventory/useInventoryMovements';
import { MovementCard } from '../movements/MovementCard';
import { AddMovementModal } from '../movements/AddMovementModal';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { useUserRole } from '../../../hooks/useUserRole';

export function RecentMovements() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { data: movements, isLoading, error } = useInventoryMovements();
  const { isAdmin, isManager, isStaff } = useUserRole();
  const canAddMovement = isAdmin || isManager || isStaff;

  // Take only the 5 most recent movements
  const recentMovements = movements?.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Movements</h2>
        {canAddMovement && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Record Movement
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      
      {recentMovements?.length ? (
        <div className="space-y-4">
          {recentMovements.map((movement) => (
            <MovementCard key={movement.id} movement={movement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recent movements</h3>
          <p className="mt-1 text-sm text-gray-500">
            Record inventory movements to track material flow.
          </p>
        </div>
      )}

      {isAddModalOpen && (
        <AddMovementModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}