import React from 'react';
import { EyeOff } from 'lucide-react';
import type { TemplateTodo } from '../../../types/templates';

type TodoFormProps = {
  todo: TemplateTodo;
  onChange: (updates: Partial<TemplateTodo>) => void;
  disabled?: boolean;
};

export function TodoForm({ todo, onChange, disabled }: TodoFormProps) {
  return (
    <div className="flex-1 space-y-2">
      <input
        type="text"
        value={todo.description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="Subtask description"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        disabled={disabled}
      />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={todo.is_private}
          onChange={(e) => onChange({ is_private: e.target.checked })}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          disabled={disabled}
        />
        <span className="flex items-center gap-1">
          <EyeOff className="h-3 w-3" />
          Private (only visible to Leumas staff)
        </span>
      </label>
    </div>
  );
}