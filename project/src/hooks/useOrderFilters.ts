import { useState, useMemo } from 'react';
import type { OrderType, ProductionOrder } from '../types/orders';

export function useOrderFilters(orders: ProductionOrder[] | null) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType | ''>('');
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [poNumber, setPoNumber] = useState('');

  const filteredOrders = useMemo(() => {
    if (!orders) return null;
    
    return orders.filter(order => {
      if (selectedBrand && order.organization?.name !== selectedBrand) return false;
      if (selectedStatus && order.status !== selectedStatus.toLowerCase()) return false;
      if (selectedOrderType && order.order_type !== selectedOrderType) return false;
      if (showPriorityOnly && !order.is_priority) return false;
      if (dueDate && order.due_date !== dueDate) return false;
      if (poNumber && !order.po_number.toLowerCase().includes(poNumber.toLowerCase())) return false;
      return true;
    });
  }, [orders, selectedBrand, selectedStatus, selectedOrderType, showPriorityOnly, dueDate, poNumber]);

  return {
    filters: {
      selectedBrand,
      selectedStatus,
      selectedOrderType,
      showPriorityOnly, 
      dueDate,
      poNumber
    },
    setters: {
      onBrandChange: setSelectedBrand,
      onStatusChange: setSelectedStatus,
      onOrderTypeChange: setSelectedOrderType,
      onPriorityFilterChange: setShowPriorityOnly,
      onDueDateChange: setDueDate,
      onPoNumberChange: setPoNumber
    },
    filteredOrders
  };
}