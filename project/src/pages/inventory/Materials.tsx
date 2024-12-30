import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { MaterialsList } from '../../components/inventory/materials/MaterialsList';
import { AddMaterialModal } from '../../components/inventory/materials/AddMaterialModal';
import { useUserRole } from '../../hooks/useUserRole';

export default function Materials() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canAddMaterial = isAdmin || isManager;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Materials</h1>
          {canAddMaterial && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Add Material
            </button>
          )}
        </div>

        <MaterialsList />

        {isAddModalOpen && (
          <AddMaterialModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}