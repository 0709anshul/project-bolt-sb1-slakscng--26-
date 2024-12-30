import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { BrandsList } from '../components/brands/BrandsList';
import { AddBrandModal } from '../components/brands/AddBrandModal';
import { useUserRole } from '../hooks/useUserRole';

export default function CustomerBrands() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canAddBrand = isAdmin || isManager;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Customer Brands</h1>
          {canAddBrand && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Add Brand
            </button>
          )}
        </div>

        <BrandsList />
        
        {isAddModalOpen && (
          <AddBrandModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}