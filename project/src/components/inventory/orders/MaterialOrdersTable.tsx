import React, { useState } from 'react';
import { Package2, Edit2 } from 'lucide-react';
import { ORDER_STATUSES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { formatDate } from '../../../utils/date';
import { MaterialOrderDetails } from './MaterialOrderDetails';
import type { MaterialOrder } from '../../../types/inventory';

type MaterialOrdersTableProps = {
  orders: MaterialOrder[];
};

export function MaterialOrdersTable({ orders }: MaterialOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<MaterialOrder | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Arrival
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.material?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.material?.leumas_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity} {UNITS_OF_MEASUREMENT[order.material?.unit_of_measurement || 'unit']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'received' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'dispatched'
                      ? 'bg-purple-100 text-purple-800'
                      : order.status === 'ordered'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ORDER_STATUSES[order.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.order_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.arrival_date ? formatDate(order.arrival_date) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <MaterialOrderDetails
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}