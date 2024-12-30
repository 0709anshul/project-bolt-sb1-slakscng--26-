import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateFormulaItem } from '../../../hooks/inventory/useCreateFormulaItem';
import { UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { Material } from '../../../types/inventory';

type AddFormulaItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  materials: Material[];
};

export function AddFormulaItemModal({ 
  isOpen, 
  onClose, 
  productId,
  materials 
}: AddFormulaItemModalProps) {
  const { createItem, isLoading, error } = useCreateFormulaItem();
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial || !quantity) return;

    try {
      await createItem({
        product_id: productId,
        material_id: selectedMaterial,
        quantity: parseFloat(quantity)
      });
      onClose();
    } catch (err) {
      console.error('Failed to add formula item:', err);
    }
  };

  if (!isOpen) return null;

  const selectedMaterialData = materials.find(m => m.id === selectedMaterial);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 flex flex-col max-h-[90vh]">
        {/* Fixed Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold">Add Material</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <select
                required
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Material</option>
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name} ({material.leumas_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity ({selectedMaterialData ? UNITS_OF_MEASUREMENT[selectedMaterialData.unit_of_measurement] : ''})
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.001"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="p-6 border-t flex justify-end gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedMaterial || !quantity || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleSubmit}
          >
            {isLoading ? 'Adding...' : 'Add Material'}
          </button>
        </div>
      </div>
    </div>
  );
}