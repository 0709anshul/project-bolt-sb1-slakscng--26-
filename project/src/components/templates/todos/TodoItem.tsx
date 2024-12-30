import React from 'react';
import { Minus, EyeOff } from 'lucide-react';
import type { TemplateTodo } from '../../../types/templates';

type TodoItemProps = {
  todo: TemplateTodo;
  onUpdate: (updates: Partial<TemplateTodo>) => void;
  onRemove: () => void;
  disabled?: boolean;
};

export function TodoItem({ todo, onUpdate, onRemove, disabled }: TodoItemProps) {
  return (
    <div className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg">
      <div className="flex-1 space-y-2">
        <input
          type="text"
          value={todo.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Subtask description"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          disabled={disabled}
        />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={todo.is_private}
            onChange={(e) => onUpdate({ is_private: e.target.checked })}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={disabled}
          />
          <span className="flex items-center gap-1">
            <EyeOff className="h-3 w-3" />
            Private (only visible to Leumas staff)
          </span>
        </label>
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        className="text-red-600 hover:text-red-700 disabled:opacity-50 p-1"
        title="Remove subtask"
      >
        <Minus className="h-5 w-5" />
      </button>
    </div>
  );
}