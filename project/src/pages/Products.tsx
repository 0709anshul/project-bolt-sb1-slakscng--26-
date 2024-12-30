import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ProductsList } from '../components/products/ProductsList';
import { ProductFilters } from '../components/products/ProductFilters';
import { AddProductModal } from '../components/products/AddProductModal';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { useUserRole } from '../hooks/useUserRole';

export default function Products() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const { isLeumasStaff } = useUserRole();
  const { products, isLoading, error } = useFilteredProducts(selectedBrand);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          {isLeumasStaff && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </button>
          )}
        </div>

        <ProductFilters
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
        />

        <ProductsList 
          products={products}
          isLoading={isLoading}
          error={error}
        />
        
        {isAddModalOpen && (
          <AddProductModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}