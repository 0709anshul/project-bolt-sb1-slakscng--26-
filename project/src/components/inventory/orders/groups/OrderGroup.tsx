import React from 'react';
import { OrderHeader } from './OrderHeader';
import { OrdersTable } from './OrdersTable';
import type { MaterialOrder } from '../../../../types/inventory';

type OrderGroupProps = {
  orders: MaterialOrder[];
  productionOrderId: string | null;
};

export function OrderGroup({ orders, productionOrderId }: OrderGroupProps) {
  if (!orders.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <OrderHeader 
        productionOrder={orders[0]?.production_order}
        isUnassigned={!productionOrderId}
      />
      <OrdersTable orders={orders} />
    </div>
  );
}