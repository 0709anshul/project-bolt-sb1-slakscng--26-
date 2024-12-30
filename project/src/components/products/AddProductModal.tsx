import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { AddProductForm } from './AddProductForm';
import type { CreateProductData } from '../../types/products';

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const { create, isLoading, error } = useCreateProduct();
  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    batch_size: 0,
    price_inr: 0,
    organization_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error handling is managed by useCreateProduct
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AddProductForm
            formData={formData}
            onChange={setFormData}
            isLoading={isLoading}
          />
          
          <div className="flex justify-end gap-4 mt-6">
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
              {isLoading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}