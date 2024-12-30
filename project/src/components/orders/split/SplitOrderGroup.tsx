import React from 'react';
import { OrderCard } from '../OrderCard';
import { SplitOrderConnection } from './SplitOrderConnection';
import type { ProductionOrder } from '../../../types/orders';

type SplitOrderGroupProps = {
  orders: ProductionOrder[];
  onUpdate?: () => void;
};

export function SplitOrderGroup({ orders, onUpdate }: SplitOrderGroupProps) {
  if (!orders.length) return null;

  // Sort orders - parent first, then split orders by PO number
  const sortedOrders = [...orders].sort((a, b) => {
    if (!a.parent_order_id && b.parent_order_id) return -1;
    if (a.parent_order_id && !b.parent_order_id) return 1;
    return a.po_number.localeCompare(b.po_number);
  });

  return (
    <div className="relative pl-6 space-y-2">
      {/* Parent order indicator */}
      {sortedOrders[0] && !sortedOrders[0].parent_order_id && (
        <div className="absolute -left-2 top-6 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
          Parent
        </div>
      )}

      {sortedOrders.map((order, index) => (
        <div key={order.id} className="flex gap-4 group">
          {/* Connection line and dot */}
          <SplitOrderConnection 
            isFirst={index === 0}
            isLast={index === sortedOrders.length - 1}
            isParent={!order.parent_order_id}
          />
          
          {/* Order card with hover effect */}
          <div className="flex-1 transition-transform duration-200 group-hover:translate-x-1">
            <OrderCard 
              order={order} 
              onUpdate={onUpdate}
              className={order.parent_order_id ? 'border-l-4 border-indigo-100' : ''}
            />
          </div>

          {/* Split reason tooltip */}
          {order.split_reason && (
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-800 text-white text-sm rounded px-2 py-1 max-w-xs">
                {order.split_reason}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}