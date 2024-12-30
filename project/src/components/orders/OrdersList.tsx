import React, { useMemo } from 'react';
import { OrderCard } from './OrderCard';
import { SplitOrderGroup } from './split/SplitOrderGroup';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { OrderSkeleton } from './OrderSkeleton';
import type { ProductionOrder } from '../../types/orders';

type OrdersListProps = {
  orders: ProductionOrder[] | null;
  isLoading: boolean;
  error: Error | null;
  hasMore?: boolean;
  loadMore?: () => void;
};

export function OrdersList({ 
  orders, 
  isLoading, 
  error,
  hasMore,
  loadMore 
}: OrdersListProps) {
  // Group orders by parent_order_id
  const { regularOrders, splitGroups } = useMemo(() => {
    if (!orders) return { regularOrders: [], splitGroups: [] };

    const splitMap = new Map<string, ProductionOrder[]>();
    const regularOrders: ProductionOrder[] = [];

    // First pass: collect parent orders and create groups
    orders.forEach(order => {
      if (!order.parent_order_id) {
        // Check if this order has any splits
        const hasSplits = orders.some(o => o.parent_order_id === order.id);
        if (hasSplits) {
          splitMap.set(order.id, [order]);
        } else {
          regularOrders.push(order);
        }
      }
    });

    // Second pass: add split orders to their groups
    orders.forEach(order => {
      if (order.parent_order_id && splitMap.has(order.parent_order_id)) {
        splitMap.get(order.parent_order_id)!.push(order);
      }
    });

    // Sort orders within each split group
    const splitGroups = Array.from(splitMap.values()).map(group => {
      return group.sort((a, b) => a.po_number.localeCompare(b.po_number));
    });

    return { regularOrders, splitGroups };
  }, [orders]);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!orders?.length && !isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        No orders found matching your filters
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Regular orders */}
      {regularOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {/* Split order groups */}
      {splitGroups.map((group) => (
        <SplitOrderGroup 
          key={group[0].id} 
          orders={group}
        />
      ))}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-6">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      )}

      {/* Load more button */}
      {hasMore && loadMore && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Load More Orders
          </button>
        </div>
      )}
    </div>
  );
}