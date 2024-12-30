import React from 'react';
import { OrderCard } from './OrderCard';
import type { ProductionOrder } from '../../types/orders';

type SplitOrderGroupProps = {
  orders: ProductionOrder[];
  onUpdate?: () => void;
};

export function SplitOrderGroup({ orders, onUpdate }: SplitOrderGroupProps) {
  if (!orders.length) return null;

  return (
    <div className="relative">
      {/* Visual connection line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-100" />
      
      {/* Orders */}
      <div className="space-y-2">
        {orders.map((order, index) => (
          <div key={order.id} className="flex items-center gap-4">
            {/* Connection dot */}
            <div className="w-3 h-3 rounded-full bg-indigo-200 z-10" />
            
            {/* Order card */}
            <div className="flex-1">
              <OrderCard order={order} onUpdate={onUpdate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}