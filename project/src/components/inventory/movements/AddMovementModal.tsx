import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateMovement } from '../../../hooks/inventory/useCreateMovement';
import { useMaterials } from '../../../hooks/inventory/useMaterials';
import { STORE_SECTIONS, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';

type AddMovementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddMovementModal({ isOpen, onClose, onSuccess }: AddMovementModalProps) {
  const { createMovement, isLoading, error } = useCreateMovement();
  const { data: materials, isLoading: loadingMaterials } = useMaterials();
  
  const [formData, setFormData] = useState({
    material_id: '',
    quantity: 0,
    from_section: '',
    to_section: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement(formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Failed to create movement:', err);
    }
  };

  if (!isOpen) return null;

  const selectedMaterial = materials?.find(m => m.id === formData.material_id);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Record Movement</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && <ErrorMessage message={error.message} />}

        {loadingMaterials ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <select
                required
                value={formData.material_id}
                onChange={(e) => setFormData({ ...formData, material_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Material</option>
                {materials?.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name} ({material.leumas_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity ({selectedMaterial ? UNITS_OF_MEASUREMENT[selectedMaterial.unit_of_measurement] : ''})
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.001"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Section
                </label>
                <select
                  value={formData.from_section}
                  onChange={(e) => setFormData({ ...formData, from_section: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">External</option>
                  {Object.entries(STORE_SECTIONS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Section
                </label>
                <select
                  required
                  value={formData.to_section}
                  onChange={(e) => setFormData({ ...formData, to_section: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Section</option>
                  {Object.entries(STORE_SECTIONS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Optional notes about this movement..."
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
                {isLoading ? 'Recording...' : 'Record Movement'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}