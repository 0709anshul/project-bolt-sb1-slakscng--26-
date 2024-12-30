import React from 'react';
import { useMaterials } from '../../../hooks/inventory/useMaterials';
import { STORE_SECTIONS, MATERIAL_CATEGORIES } from '../../../lib/constants/inventory';
import { LoadingSpinner } from '../../common/LoadingSpinner';

type MovementFiltersProps = {
  filters?: {
    material: string;
    category: string;
    fromSection: string;
    toSection: string;
    dateFrom: string;
    dateTo: string;
  };
  onChange?: (key: string, value: string) => void;
};

export function MovementFilters({ filters = defaultFilters, onChange }: MovementFiltersProps) {
  const { data: materials, isLoading } = useMaterials();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <select
            value={filters.material}
            onChange={(e) => onChange?.('material', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Materials</option>
            {materials?.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange?.('category', e.target.value)}
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
            From Section
          </label>
          <select
            value={filters.fromSection}
            onChange={(e) => onChange?.('fromSection', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Sections</option>
            <option value="external">External</option>
            {Object.entries(STORE_SECTIONS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Section
          </label>
          <select
            value={filters.toSection}
            onChange={(e) => onChange?.('toSection', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Sections</option>
            {Object.entries(STORE_SECTIONS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange?.('dateFrom', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange?.('dateTo', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

const defaultFilters = {
  material: '',
  category: '',
  fromSection: '',
  toSection: '',
  dateFrom: '',
  dateTo: ''
};