import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useInventoryMovements } from '../../../hooks/inventory/useInventoryMovements';
import { MovementCard } from './MovementCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function MovementsList() {
  const { data: movements, isLoading, error } = useInventoryMovements();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!movements?.length) return <EmptyState />;

  // Group movements by date
  const groupedMovements = movements.reduce((acc, movement) => {
    const date = new Date(movement.moved_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(movement);
    return acc;
  }, {} as Record<string, typeof movements>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedMovements).map(([date, dateMovements]) => (
        <div key={date}>
          <h2 className="text-lg font-medium text-gray-900 mb-4">{date}</h2>
          <div className="space-y-4">
            {dateMovements.map((movement) => (
              <MovementCard key={movement.id} movement={movement} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No movements</h3>
      <p className="mt-1 text-sm text-gray-500">No inventory movements recorded yet.</p>
    </div>
  );
}