import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';
import { useUsers } from '../../hooks/useUsers';
import { useDeleteTemplate } from '../../hooks/useDeleteTemplate';
import { EditTemplateModal } from './EditTemplateModal';
import type { TaskTemplate, TaskTemplateItem } from '../../types/templates';

type TemplateCardProps = {
  template: TaskTemplate;
  items?: TaskTemplateItem[];
  onDelete?: () => void;
};

export function TemplateCard({ template, items, onDelete }: TemplateCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const { data: users } = useUsers();
  const { deleteTemplate, isLoading } = useDeleteTemplate();
  const canManageTemplates = isAdmin || isManager;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplate(template.id);
        onDelete?.();
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const getOwnerName = (ownerId: string | null) => {
    if (!ownerId) return 'Unassigned';
    return users?.find(user => user.id === ownerId)?.full_name || 'Unknown';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
            {template.description && (
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            )}
          </div>
          {canManageTemplates && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="text-gray-400 hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          {items?.length || 0} tasks
        </button>

        {isExpanded && items && (
          <div className="mt-4 space-y-3">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{index + 1}.</span>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500">({item.duration_days} days)</span>
                </div>
                <span className="text-gray-500">
                  {getOwnerName(item.owner_id)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <EditTemplateModal
          template={template}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={onDelete}
        />
      )}
    </>
  );
}