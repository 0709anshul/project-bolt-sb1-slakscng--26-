import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { MaterialOrdersList } from '../../components/inventory/orders/MaterialOrdersList';
import { AddMaterialOrderModal } from '../../components/inventory/orders/AddMaterialOrderModal';
import { useUserRole } from '../../hooks/useUserRole';

export default function MaterialOrders() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canAddOrder = isAdmin || isManager;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Material Orders</h1>
          {canAddOrder && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Place Order
            </button>
          )}
        </div>

        <MaterialOrdersList />

        {isAddModalOpen && (
          <AddMaterialOrderModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}