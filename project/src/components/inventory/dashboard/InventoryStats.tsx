import React from 'react';
import { Package2, ArrowRightLeft, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useInventoryStats } from '../../../hooks/inventory/useInventoryStats';
import { StatCard } from './StatCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function InventoryStats() {
  const { data: stats, isLoading, error } = useInventoryStats();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Package2}
        label="Total Materials"
        value={stats.totalMaterials}
        color="bg-blue-500"
      />
      <StatCard
        icon={ArrowRightLeft}
        label="Today's Movements"
        value={stats.todayMovements}
        color="bg-green-500"
      />
      <StatCard
        icon={ShoppingCart}
        label="Pending Orders"
        value={stats.pendingOrders}
        color="bg-yellow-500"
      />
      <StatCard
        icon={AlertTriangle}
        label="Low Stock Items"
        value={stats.lowStockItems}
        color="bg-red-500"
      />
    </div>
  );
}