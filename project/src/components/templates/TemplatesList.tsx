import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useTaskTemplates } from '../../hooks/useTaskTemplates';
import { TemplateCard } from './TemplateCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { TaskTemplateItem } from '../../types/templates';

export function TemplatesList() {
  const { templates, getTemplateItems, isLoading, error, refetch } = useTaskTemplates();
  const [templateItems, setTemplateItems] = React.useState<Record<string, TaskTemplateItem[]>>({});

  React.useEffect(() => {
    if (templates) {
      templates.forEach(template => {
        getTemplateItems(template.id)
          .then(items => {
            setTemplateItems(prev => ({
              ...prev,
              [template.id]: items || []
            }));
          })
          .catch(console.error);
      });
    }
  }, [templates, getTemplateItems]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!templates?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template}
          items={templateItems[template.id] || []}
          onDelete={refetch}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No templates</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new template.</p>
    </div>
  );
}