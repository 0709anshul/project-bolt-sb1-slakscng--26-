import React from 'react';
import { Package2 } from 'lucide-react';
import { useInventoryLevels } from '../../../hooks/inventory/useInventoryLevels';
import { STORE_SECTIONS, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

export function InventoryLevels() {
  const { data: levels, isLoading, error } = useInventoryLevels();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!levels?.length) return <EmptyState />;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Current Inventory Levels</h2>
      
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              {Object.values(STORE_SECTIONS).map((section) => (
                <th key={section} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {section}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {levels.map((item) => (
              <tr key={item.material_id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.material?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {UNITS_OF_MEASUREMENT[item.material?.unit_of_measurement || 'unit']}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.inward}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.brand}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.production}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Current Inventory Levels</h2>
      <div className="text-center py-8">
        <Package2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory data</h3>
        <p className="mt-1 text-sm text-gray-500">Start recording inventory movements to see levels.</p>
      </div>
    </div>
  );
}