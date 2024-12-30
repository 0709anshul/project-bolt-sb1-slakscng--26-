import React from 'react';
import { useOrganizations } from '../../hooks/useOrganizations';
import type { CreateProductData } from '../../types/products';

type AddProductFormProps = {
  formData: CreateProductData;
  onChange: (data: CreateProductData) => void;
  isLoading: boolean;
};

export function AddProductForm({ formData, onChange, isLoading }: AddProductFormProps) {
  const { data: organizations } = useOrganizations();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand
        </label>
        <select
          required
          value={formData.organization_id}
          onChange={(e) => onChange({ ...formData, organization_id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="">Select Brand</option>
          {organizations?.filter(org => org.type === 'Customer Brand').map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Batch Size
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.batch_size}
          onChange={(e) => onChange({ ...formData, batch_size: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price (₹)
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={formData.price_inr}
          onChange={(e) => onChange({ ...formData, price_inr: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}