import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCreateTemplate } from '../../hooks/useCreateTemplate';
import { TemplateItemForm } from './TemplateItemForm';
import type { TaskTemplateItem } from '../../types/templates';

type AddTemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type TemplateFormData = {
  name: string;
  description: string;
  items: TaskTemplateItem[];
};

export function AddTemplateModal({ isOpen, onClose, onSuccess }: AddTemplateModalProps) {
  const { create, isLoading, error } = useCreateTemplate();
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    items: [{
      id: 'new-0',
      template_id: '',
      name: '',
      duration_days: 1,
      order_index: 1,
      todos: [],
      created_at: new Date().toISOString()
    }]
  });

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: `new-${prev.items.length}`,
        template_id: '',
        name: '',
        duration_days: 1,
        order_index: prev.items.length + 1,
        todos: [],
        created_at: new Date().toISOString()
      }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, updates: Partial<TaskTemplateItem>) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error handling is managed by useCreateTemplate
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Task Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Template Tasks</h3>
              <button
                type="button"
                onClick={addItem}
                disabled={isLoading}
                className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {formData.items.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-start">
                <TemplateItemForm
                  item={item}
                  onChange={(updates) => updateItem(index, updates)}
                  disabled={isLoading}
                />

                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={isLoading}
                    className="mt-8 text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

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
              {isLoading ? 'Creating...' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}