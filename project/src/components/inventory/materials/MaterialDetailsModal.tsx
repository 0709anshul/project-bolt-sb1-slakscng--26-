import React from 'react';
import { X } from 'lucide-react';
import { MATERIAL_CATEGORIES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { Material } from '../../../types/inventory';

type MaterialDetailsModalProps = {
  material: Material;
  isOpen: boolean;
  onClose: () => void;
};

export function MaterialDetailsModal({ material, isOpen, onClose }: MaterialDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{material.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Leumas ID</label>
              <p className="mt-1 text-sm text-gray-900">{material.leumas_id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <p className="mt-1 text-sm text-gray-900">
                {MATERIAL_CATEGORIES[material.category]}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <p className="mt-1 text-sm text-gray-900">
                {UNITS_OF_MEASUREMENT[material.unit_of_measurement]}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cost per unit</label>
              <p className="mt-1 text-sm text-gray-900">₹{material.cost_per_unit}</p>
            </div>
          </div>

          {material.make_description && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Make & Description
              </label>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {material.make_description}
              </p>
            </div>
          )}

          {material.vendor_details && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Details
              </label>
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{material.vendor_details.name}</p>
                    <p className="text-gray-600">{material.vendor_details.contact}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{material.vendor_details.email}</p>
                    <p className="text-gray-600">{material.vendor_details.phone}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{material.vendor_details.address}</p>
              </div>
            </div>
          )}

          {material.acceptance_criteria && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Acceptance Criteria
              </label>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {material.acceptance_criteria}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}