import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProductsList } from '../../ProductsList';
import { LimitedList } from '../../common/LimitedList';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { SectionHeader } from './SectionHeader';
import { AddProductModal } from '../../products/AddProductModal';
import { useUserRole } from '../../../hooks/useUserRole';
import { useProducts } from '../../../hooks/useProducts';

export function ProductsSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const { data: products, isLoading, error } = useProducts();
  const canAddProduct = isAdmin || isManager;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-6">
      <SectionHeader 
        title="Products"
        actionIcon={canAddProduct ? Plus : undefined}
        actionLabel={canAddProduct ? "Add Product" : undefined}
        onAction={canAddProduct ? () => setIsAddModalOpen(true) : undefined}
      />

      <LimitedList
        items={products}
        renderItem={(product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h3 className="font-medium truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">Batch size: {product.batch_size}</p>
              </div>
              <p className="text-indigo-600 font-medium whitespace-nowrap ml-4">₹{product.price_inr}</p>
            </div>
          </div>
        )}
        emptyMessage="No products found"
        limit={8}
      />

      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}