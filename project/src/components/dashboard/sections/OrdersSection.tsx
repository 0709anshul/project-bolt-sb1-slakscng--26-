import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { OrderCard } from '../../orders/OrderCard';
import { SplitOrderGroup } from '../../orders/split/SplitOrderGroup';
import { LimitedList } from '../../common/LimitedList';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { SectionHeader } from './SectionHeader';
import { AddOrderModal } from '../../orders/AddOrderModal';
import { useUserRole } from '../../../hooks/useUserRole';
import { useOrders } from '../../../hooks/useOrders';
import type { ProductionOrder } from '../../../types/orders';

export function OrdersSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isLeumasStaff } = useUserRole();
  const { data: orders, isLoading, error, refetch } = useOrders();

  // Group orders by parent/child relationship
  const { regularOrders, splitGroups } = React.useMemo(() => {
    if (!orders) return { regularOrders: [], splitGroups: [] };

    const splitMap = new Map<string, ProductionOrder[]>();
    const regularOrders: ProductionOrder[] = [];

    // First pass: collect parent orders
    orders.forEach(order => {
      if (!order.parent_order_id) {
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

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-6">
      <SectionHeader 
        title="Production Orders"
        actionIcon={isLeumasStaff ? Plus : undefined}
        actionLabel={isLeumasStaff ? "Add Order" : undefined}
        onAction={isLeumasStaff ? () => setIsAddModalOpen(true) : undefined}
      />

      <div className="mt-4">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error.message} />}
        {orders && (
          <div className="space-y-4">
            {/* Regular Orders */}
            <LimitedList
              items={regularOrders}
              renderItem={(order) => (
                <OrderCard key={order.id} order={order} />
              )}
              limit={4}
            />

            {/* Split Order Groups */}
            <LimitedList
              items={splitGroups}
              renderItem={(group) => (
                <SplitOrderGroup 
                  key={group[0].id} 
                  orders={group}
                  onUpdate={refetch}
                />
              )}
              limit={2}
            />
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddOrderModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}