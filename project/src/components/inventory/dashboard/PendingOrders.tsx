import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useMaterialOrders } from '../../../hooks/inventory/useMaterialOrders';
import { OrderGroup } from '../orders/groups/OrderGroup';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function PendingOrders() {
  const { data: orders, isLoading, error } = useMaterialOrders();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  // Filter only pending and ordered status
  const pendingOrders = orders?.filter(
    order => ['pending', 'ordered'].includes(order.status)
  );

  // Group orders by production order
  const groupedOrders = pendingOrders?.reduce((acc, order) => {
    const key = order.production_order_id || 'unassigned';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {} as Record<string, typeof pendingOrders>);

  if (!groupedOrders || Object.keys(groupedOrders).length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Orders</h2>
      <div className="space-y-4">
        {Object.entries(groupedOrders).map(([key, orders]) => (
          orders && <OrderGroup 
            key={key}
            orders={orders}
            productionOrderId={key === 'unassigned' ? null : key}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Orders</h2>
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No pending orders</h3>
        <p className="mt-1 text-sm text-gray-500">
          All material orders have been fulfilled.
        </p>
      </div>
    </div>
  );
}