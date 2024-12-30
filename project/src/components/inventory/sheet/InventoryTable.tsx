import React from 'react';
import { Package2 } from 'lucide-react';
import { MATERIAL_CATEGORIES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { MaterialInventory } from '../../../types/inventory';

type InventoryTableProps = {
  levels: MaterialInventory[];
};

export function InventoryTable({ levels }: InventoryTableProps) {
  if (!levels.length) {
    return (
      <div className="text-center py-12">
        <Package2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory data</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start recording inventory movements to see levels.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inward Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Production Floor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                FG Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {levels.map((level) => (
              <tr key={level.material_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {level.material?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {level.material?.leumas_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {MATERIAL_CATEGORIES[level.material?.category || 'RM']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {level.inward} {UNITS_OF_MEASUREMENT[level.material?.unit_of_measurement || 'unit']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {level.brand} {UNITS_OF_MEASUREMENT[level.material?.unit_of_measurement || 'unit']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {level.production} {UNITS_OF_MEASUREMENT[level.material?.unit_of_measurement || 'unit']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {level.fg_store} {UNITS_OF_MEASUREMENT[level.material?.unit_of_measurement || 'unit']}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {level.total} {UNITS_OF_MEASUREMENT[level.material?.unit_of_measurement || 'unit']}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}