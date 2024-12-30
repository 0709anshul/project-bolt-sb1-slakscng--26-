import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { InventoryStats } from '../../components/inventory/dashboard/InventoryStats';
import { InventoryLevels } from '../../components/inventory/dashboard/InventoryLevels';
import { RecentMovements } from '../../components/inventory/dashboard/RecentMovements';
import { PendingOrders } from '../../components/inventory/dashboard/PendingOrders';

export default function InventoryDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Dashboard</h1>
        
        <InventoryStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryLevels />
          <PendingOrders />
        </div>
        
        <RecentMovements />
      </div>
    </DashboardLayout>
  );
}