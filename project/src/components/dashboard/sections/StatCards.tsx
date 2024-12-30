import React from 'react';
import { ClipboardList, Package2, Building2, Clock } from 'lucide-react';
import { StatCard } from './StatCard';
import { useStats } from '../../../hooks/useStats';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function StatCards() {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={ClipboardList}
        label="Active Orders"
        value={stats.activeOrders}
        color="bg-blue-500"
      />
      <StatCard
        icon={Clock}
        label="Pending Tasks"
        value={stats.pendingTasks}
        color="bg-yellow-500"
      />
      <StatCard
        icon={Package2}
        label="Total Products"
        value={stats.totalProducts}
        color="bg-green-500"
      />
      <StatCard
        icon={Building2}
        label="Active Brands"
        value={stats.activeBrands}
        color="bg-purple-500"
      />
    </div>
  );
}