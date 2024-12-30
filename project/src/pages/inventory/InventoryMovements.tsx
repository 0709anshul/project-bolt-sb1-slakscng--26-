import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { MovementsList } from '../../components/inventory/movements/MovementsList';
import { MovementFilters } from '../../components/inventory/movements/MovementFilters';

export default function InventoryMovements() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Movements</h1>
        <MovementFilters />
        <MovementsList />
      </div>
    </DashboardLayout>
  );
}