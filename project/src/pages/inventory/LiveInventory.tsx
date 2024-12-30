import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { InventorySheet } from '../../components/inventory/sheet/InventorySheet';

export default function LiveInventory() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Live Inventory Sheet</h1>
        <InventorySheet />
      </div>
    </DashboardLayout>
  );
}