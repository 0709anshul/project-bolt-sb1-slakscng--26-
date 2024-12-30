import React, { useState } from 'react';
import { Package2, ChevronDown, ChevronUp } from 'lucide-react';
import { MaterialOrdersTable } from './MaterialOrdersTable';
import type { MaterialOrder } from '../../../types/inventory';

type MaterialOrderCardProps = {
  orders: MaterialOrder[];
  productionOrderId: string | null;
};

export function MaterialOrderCard({ orders, productionOrderId }: MaterialOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Guard against empty orders array
  if (!orders?.length) return null;

  const productionOrder = orders[0]?.production_order;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <Package2 className="h-6 w-6 text-gray-400" />
          <div>
            {productionOrderId ? (
              <>
                <h3 className="text-lg font-medium text-gray-900">
                  PO: {productionOrder?.po_number}
                </h3>
                <p className="text-sm text-gray-500">
                  {productionOrder?.product?.name} ({productionOrder?.quantity} units)
                </p>
              </>
            ) : (
              <h3 className="text-lg font-medium text-gray-900">
                Unassigned Orders
              </h3>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {productionOrder && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              productionOrder.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {productionOrder.status}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <MaterialOrdersTable orders={orders} />
        </div>
      )}
    </div>
  );
}