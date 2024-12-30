import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { OrderHeader } from '../components/orders/OrderHeader';
import { OrderFilters } from '../components/orders/OrderFilters';
import { OrdersList } from '../components/orders/OrdersList';
import { useOrders } from '../hooks/useOrders';
import type { OrderType } from '../types/orders';

export default function ProductionOrders() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType | ''>('');
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);
  const [dueDate, setDueDate] = useState<string>('');
  const [poNumber, setPoNumber] = useState<string>('');
  
  const { data: orders, isLoading, error, hasMore, loadMore } = useOrders();

  const filteredOrders = orders?.filter(order => {
    if (!order) return false;
    if (selectedBrand && order.organization?.name !== selectedBrand) return false;
    if (selectedStatus && order.status !== selectedStatus.toLowerCase()) return false;
    if (selectedOrderType && order.order_type !== selectedOrderType) return false;
    if (showPriorityOnly && !order.is_priority) return false;
    if (dueDate && order.due_date !== dueDate) return false;
    if (poNumber && !order.po_number.toLowerCase().includes(poNumber.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <OrderHeader />
        
        <OrderFilters
          selectedBrand={selectedBrand}
          selectedStatus={selectedStatus}
          selectedOrderType={selectedOrderType}
          showPriorityOnly={showPriorityOnly}
          dueDate={dueDate}
          poNumber={poNumber}
          onBrandChange={setSelectedBrand}
          onStatusChange={setSelectedStatus}
          onOrderTypeChange={setSelectedOrderType}
          onPriorityFilterChange={setShowPriorityOnly}
          onDueDateChange={setDueDate}
          onPoNumberChange={setPoNumber}
        />

        <OrdersList 
          orders={filteredOrders}
          isLoading={isLoading}
          error={error}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </div>
    </DashboardLayout>
  );
}