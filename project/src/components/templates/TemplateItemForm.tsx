import React from 'react';
import { TodoList } from './todos/TodoList';
import type { TaskTemplateItem } from '../../types/templates';

type TemplateItemFormProps = {
  item: TaskTemplateItem;
  onChange: (updates: Partial<TaskTemplateItem>) => void;
  disabled?: boolean;
};

export function TemplateItemForm({ item, onChange, disabled }: TemplateItemFormProps) {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          required
          value={item.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration (days)
        </label>
        <input
          type="number"
          required
          min="1"
          value={item.duration_days}
          onChange={(e) => onChange({ duration_days: Math.max(1, parseInt(e.target.value) || 1) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details Template
        </label>
        <textarea
          value={item.details_template || ''}
          onChange={(e) => onChange({ details_template: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
          placeholder="Optional template for task details"
        />
      </div>

      <TodoList
        item={item}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}