import React from 'react';
import { Plus, Minus, EyeOff } from 'lucide-react';
import type { TaskTemplateItem, TemplateTodo } from '../../types/templates';

type TemplateItemTodosProps = {
  item: TaskTemplateItem;
  onChange: (updates: Partial<TaskTemplateItem>) => void;
  disabled?: boolean;
};

export function TemplateItemTodos({ item, onChange, disabled }: TemplateItemTodosProps) {
  const todos = item.todos || [];

  const addTodo = () => {
    const newTodo: TemplateTodo = {
      description: '',
      is_private: false
    };
    onChange({ todos: [...todos, newTodo] });
  };

  const removeTodo = (index: number) => {
    onChange({
      todos: todos.filter((_, i) => i !== index)
    });
  };

  const updateTodo = (index: number, updates: Partial<TemplateTodo>) => {
    onChange({
      todos: todos.map((todo, i) => 
        i === index ? { ...todo, ...updates } : todo
      )
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Subtasks
        </label>
        <button
          type="button"
          onClick={addTodo}
          disabled={disabled}
          className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50 p-1"
          title="Add subtask"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {todos.map((todo, index) => (
          <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={todo.description}
                onChange={(e) => updateTodo(index, { description: e.target.value })}
                placeholder="Subtask description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                disabled={disabled}
              />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={todo.is_private}
                  onChange={(e) => updateTodo(index, { is_private: e.target.checked })}
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
              onClick={() => removeTodo(index)}
              disabled={disabled}
              className="text-red-600 hover:text-red-700 disabled:opacity-50 p-1 mt-1"
              title="Remove subtask"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}