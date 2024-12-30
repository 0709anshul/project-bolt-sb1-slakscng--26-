import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateMaterial } from '../../../hooks/inventory/useCreateMaterial';
import { MATERIAL_CATEGORIES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { Material, VendorDetails } from '../../../types/inventory';

type AddMaterialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type MaterialFormData = Omit<Material, 'id' | 'created_at' | 'updated_at'>;

export function AddMaterialModal({ isOpen, onClose, onSuccess }: AddMaterialModalProps) {
  const { createMaterial, isLoading, error } = useCreateMaterial();
  const [formData, setFormData] = useState<MaterialFormData>({
    leumas_id: '',
    name: '',
    make_description: '',
    vendor_details: null,
    unit_of_measurement: 'unit',
    cost_per_unit: 0,
    category: 'RM',
    acceptance_criteria: ''
  });

  const [vendorDetails, setVendorDetails] = useState<VendorDetails>({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMaterial({
        ...formData,
        vendor_details: Object.values(vendorDetails).some(v => v)
          ? vendorDetails
          : null
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Failed to create material:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Material</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Leumas ID
              </label>
              <input
                type="text"
                required
                value={formData.leumas_id}
                onChange={(e) => setFormData({ ...formData, leumas_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MaterialFormData['category'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.entries(MATERIAL_CATEGORIES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit of Measurement
              </label>
              <select
                required
                value={formData.unit_of_measurement}
                onChange={(e) => setFormData({ ...formData, unit_of_measurement: e.target.value as MaterialFormData['unit_of_measurement'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.entries(UNITS_OF_MEASUREMENT).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cost per unit (₹)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.cost_per_unit}
                onChange={(e) => setFormData({ ...formData, cost_per_unit: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Make & Description
            </label>
            <textarea
              value={formData.make_description || ''}
              onChange={(e) => setFormData({ ...formData, make_description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor Details
            </label>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    value={vendorDetails.name}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={vendorDetails.contact}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, contact: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={vendorDetails.email}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={vendorDetails.phone}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={vendorDetails.address}
                  onChange={(e) => setVendorDetails({ ...vendorDetails, address: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Acceptance Criteria
            </label>
            <textarea
              value={formData.acceptance_criteria || ''}
              onChange={(e) => setFormData({ ...formData, acceptance_criteria: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the criteria for accepting this material..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}