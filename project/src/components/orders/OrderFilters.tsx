import React from 'react';
import { BrandFilter } from '../filters/BrandFilter';
import type { OrderType } from '../../types/orders';

type OrderFiltersProps = {
  selectedBrand: string;
  selectedStatus: string;
  selectedOrderType: OrderType | '';
  showPriorityOnly: boolean;
  dueDate: string;
  poNumber: string;
  onBrandChange: (brand: string) => void;
  onStatusChange: (status: string) => void;
  onOrderTypeChange: (type: OrderType | '') => void;
  onPriorityFilterChange: (show: boolean) => void;
  onDueDateChange: (date: string) => void;
  onPoNumberChange: (number: string) => void;
};

export function OrderFilters({
  selectedBrand,
  selectedStatus,
  selectedOrderType,
  showPriorityOnly,
  dueDate,
  poNumber,
  onBrandChange,
  onStatusChange,
  onOrderTypeChange,
  onPriorityFilterChange,
  onDueDateChange,
  onPoNumberChange
}: OrderFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PO Number
          </label>
          <input
            type="text"
            placeholder="Search PO number"
            value={poNumber}
            onChange={(e) => onPoNumberChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <BrandFilter 
          value={selectedBrand} 
          onChange={onBrandChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Type
          </label>
          <select
            value={selectedOrderType}
            onChange={(e) => onOrderTypeChange(e.target.value as OrderType | '')}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Types</option>
            <option value="Project Plan">Project Plan</option>
            <option value="Production Order">Production Order</option>
            <option value="NPD Order">NPD Order</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showPriorityOnly}
              onChange={(e) => onPriorityFilterChange(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Priority Orders Only
          </label>
        </div>
      </div>
    </div>
  );
}