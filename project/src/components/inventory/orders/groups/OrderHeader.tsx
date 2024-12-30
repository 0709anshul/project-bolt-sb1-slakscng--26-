import React from 'react';
import type { ProductionOrder } from '../../../../types/orders';

type OrderHeaderProps = {
  productionOrder?: ProductionOrder | null;
  isUnassigned: boolean;
};

export function OrderHeader({ productionOrder, isUnassigned }: OrderHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      {isUnassigned ? (
        <h3 className="text-lg font-medium text-gray-900">
          Unassigned Orders
        </h3>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              PO: {productionOrder?.po_number}
            </h3>
            <p className="text-sm text-gray-500">
              {productionOrder?.product?.name} ({productionOrder?.quantity} units)
            </p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            productionOrder?.status === 'completed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {productionOrder?.status}
          </span>
        </div>
      )}
    </div>
  );
}