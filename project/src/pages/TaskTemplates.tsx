import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TemplatesList } from '../components/templates/TemplatesList';
import { AddTemplateModal } from '../components/templates/AddTemplateModal';
import { useUserRole } from '../hooks/useUserRole';

export default function TaskTemplates() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canManageTemplates = isAdmin || isManager;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Task Templates</h1>
          {canManageTemplates && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Add Template
            </button>
          )}
        </div>

        <TemplatesList />

        {isAddModalOpen && (
          <AddTemplateModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}