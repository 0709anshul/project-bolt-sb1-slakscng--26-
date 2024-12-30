import React from 'react';
import type { TaskTemplateItem } from '../../types/templates';

type TemplateItemsListProps = {
  items: TaskTemplateItem[];
};

export function TemplateItemsList({ items }: TemplateItemsListProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Template Tasks:</h4>
      <ul className="space-y-1 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span>• {item.name}</span>
            <span className="text-gray-400">({item.duration_days} days)</span>
            {item.todos && item.todos.length > 0 && (
              <span className="text-indigo-600">
                ({item.todos.length} subtasks)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}