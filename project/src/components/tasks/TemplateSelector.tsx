import React, { useState, useEffect } from 'react';
import { useTaskTemplates } from '../../hooks/useTaskTemplates';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { TemplateItemsList } from '../templates/TemplateItemsList';
import type { TaskDraft } from '../../types/tasks';

type TemplateSelectorProps = {
  productionOrderId: string;
  startDate: string;
  onAddTasks: (tasks: TaskDraft[]) => void;
  disabled?: boolean;
};

export function TemplateSelector({ 
  productionOrderId,
  startDate,
  onAddTasks,
  disabled 
}: TemplateSelectorProps) {
  const { templates, getTemplateItems, isLoading: loadingTemplates } = useTaskTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateItems, setTemplateItems] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadItems() {
      if (!selectedTemplate) {
        setTemplateItems(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const items = await getTemplateItems(selectedTemplate);
        setTemplateItems(items);
      } catch (err) {
        console.error('Error loading template items:', err);
        setError('Failed to load template items');
        setTemplateItems(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadItems();
  }, [selectedTemplate, getTemplateItems]);

  const handleApplyTemplate = () => {
    if (!templateItems) return;

    const tasks: TaskDraft[] = templateItems.map(item => ({
      production_order_id: productionOrderId,
      name: item.name,
      details: item.details_template || item.name,
      start_date: startDate,
      duration_days: item.duration_days,
      fromTemplate: true,
      templateItemId: item.id,
      todos: item.todos || []
    }));

    onAddTasks(tasks);
    setSelectedTemplate('');
    setTemplateItems(null);
  };

  if (loadingTemplates) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {error && <ErrorMessage message={error} />}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Template
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled || isLoading}
        >
          <option value="">Choose a template</option>
          {templates?.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingSpinner />}

      {templateItems && !isLoading && (
        <div className="space-y-4">
          <TemplateItemsList items={templateItems} />
          
          <button
            type="button"
            onClick={handleApplyTemplate}
            disabled={disabled}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Apply Template Tasks
          </button>
        </div>
      )}
    </div>
  );
}