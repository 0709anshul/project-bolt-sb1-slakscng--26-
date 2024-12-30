import React from 'react';
import { Search } from 'lucide-react';
import { MATERIAL_CATEGORIES } from '../../../lib/constants/inventory';
import type { MaterialCategory } from '../../../types/inventory';

type InventoryFiltersProps = {
  selectedCategory: MaterialCategory | '';
  onCategoryChange: (category: MaterialCategory | '') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function InventoryFilters({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: InventoryFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as MaterialCategory | '')}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {Object.entries(MATERIAL_CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or ID..."
              className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}