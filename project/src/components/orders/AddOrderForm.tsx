import React from 'react';
import { useOrganizations } from '../../hooks/useOrganizations';
import { useProducts } from '../../hooks/useProducts';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import type { CreateOrderData } from '../../types/orders';

type AddOrderFormProps = {
  formData: CreateOrderData;
  onChange: (data: Partial<CreateOrderData>) => void;
  isLoading: boolean;
};

export function AddOrderForm({ formData, onChange, isLoading }: AddOrderFormProps) {
  const { data: organizations } = useOrganizations();
  const { data: products } = useProducts();
  const { user } = useCurrentUser();
  const isBrandUser = user?.role === 'brand_user';

  // For brand users, filter products to only show their organization's products
  const availableProducts = products?.filter(p => 
    !isBrandUser || p.organization_id === user?.organization_id
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          PO Number
        </label>
        <input
          type="text"
          required
          value={formData.po_number}
          onChange={(e) => onChange({ po_number: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      {!isBrandUser && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            required
            value={formData.organization_id}
            onChange={(e) => onChange({ 
              organization_id: e.target.value,
              product_id: '' // Reset product when brand changes
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Brand</option>
            {organizations?.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product
        </label>
        <select
          required
          value={formData.product_id}
          onChange={(e) => onChange({ product_id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="">Select Product</option>
          {availableProducts?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.organization?.name})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.quantity || ''}
          onChange={(e) => onChange({ quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Order Type
        </label>
        <select
          required
          value={formData.order_type}
          onChange={(e) => onChange({ order_type: e.target.value as CreateOrderData['order_type'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="Production Order">Production Order</option>
          <option value="Project Plan">Project Plan</option>
          <option value="NPD Order">NPD Order</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details
        </label>
        <textarea
          value={formData.details || ''}
          onChange={(e) => onChange({ details: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}