import React, { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import { useMaterialRequirements } from '../../../hooks/inventory/useMaterialRequirements';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { ProductionOrder } from '../../../types/orders';

type MaterialIndentFormProps = {
  onSubmit: (materials: { material_id: string; quantity: number; production_order_id: string }[]) => void;
  isLoading?: boolean;
};

export function MaterialIndentForm({ onSubmit, isLoading = false }: MaterialIndentFormProps) {
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
  const { data: orders, isLoading: loadingOrders, error: ordersError } = useOrders();
  const { 
    data: requirements, 
    isLoading: loadingRequirements, 
    error: requirementsError 
  } = useMaterialRequirements(selectedOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirements || !selectedOrder?.id) return;

    const materialsToOrder = requirements
      .filter(req => req.shortage_quantity > 0)
      .map(req => ({
        material_id: req.material.id,
        quantity: req.shortage_quantity,
        production_order_id: selectedOrder.id
      }));

    onSubmit(materialsToOrder);
  };

  if (loadingOrders) return <LoadingSpinner />;
  if (ordersError) return <ErrorMessage message={ordersError.message} />;

  // Filter orders to only show pending orders with products
  const pendingOrders = orders?.filter(o => 
    o.status === 'pending' && 
    o.product?.id && 
    o.quantity > 0
  ) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Production Order
        </label>
        <select
          required
          value={selectedOrder?.id || ''}
          onChange={(e) => {
            const order = orders?.find(o => o.id === e.target.value);
            setSelectedOrder(order || null);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="">Select Production Order</option>
          {pendingOrders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.po_number} - {order.product?.name} ({order.quantity} units)
            </option>
          ))}
        </select>
      </div>

      {/* Requirements Table */}
      {selectedOrder && (
        <div className="mt-4">
          {loadingRequirements ? (
            <LoadingSpinner />
          ) : requirementsError ? (
            <ErrorMessage message={requirementsError.message} />
          ) : requirements?.length ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Material Requirements</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Required
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shortage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requirements.map((req) => (
                      <tr key={req.material.id} className={req.shortage_quantity > 0 ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {req.material.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {req.material.leumas_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {req.required_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {req.available_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {req.shortage_quantity > 0 ? (
                            <span className="text-sm text-red-600 font-medium">
                              {req.shortage_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                            </span>
                          ) : (
                            <span className="text-sm text-green-600 font-medium">
                              Sufficient
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requirements.some(req => req.shortage_quantity > 0) && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Orders...' : 'Place Material Orders'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No materials required for this order
            </div>
          )}
        </div>
      )}
    </form>
  );
}