import React from 'react';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { MaterialRequirement } from '../../../types/inventory/indent';

type MaterialRequirementsTableProps = {
  requirements: MaterialRequirement[] | null;
  isLoading: boolean;
  error: Error | null;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export function MaterialRequirementsTable({
  requirements,
  isLoading,
  error,
  onSubmit,
  isSubmitting
}: MaterialRequirementsTableProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!requirements?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No materials required for this order
      </div>
    );
  }

  const hasShortages = requirements.some(req => req.shortage_quantity > 0);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Material Requirements</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Required
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shortage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requirements.map((req) => (
              <tr key={req.material.id} className={req.shortage_quantity > 0 ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {req.material.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {req.material.leumas_id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.required_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.available_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {req.shortage_quantity > 0 ? (
                    <span className="text-sm text-red-600 font-medium">
                      {req.shortage_quantity} {UNITS_OF_MEASUREMENT[req.material.unit_of_measurement]}
                    </span>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">
                      Sufficient
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasShortages && (
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Orders...' : 'Place Material Orders'}
          </button>
        </div>
      )}
    </div>
  );
}