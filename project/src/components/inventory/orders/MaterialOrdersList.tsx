import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useMaterialOrders } from '../../../hooks/inventory/useMaterialOrders';
import { MaterialOrderCard } from './MaterialOrderCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function MaterialOrdersList() {
  const { data: orders, isLoading, error } = useMaterialOrders();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!orders?.length) return <EmptyState />;

  // Group orders by production order
  const groupedOrders = orders.reduce((acc, order) => {
    const key = order.production_order_id || 'unassigned';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {} as Record<string, typeof orders>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedOrders).map(([key, orders]) => (
        <MaterialOrderCard 
          key={key} 
          orders={orders}
          productionOrderId={key === 'unassigned' ? null : key}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No material orders</h3>
      <p className="mt-1 text-sm text-gray-500">
        Material orders will appear here when you create them from production orders.
      </p>
    </div>
  );
}