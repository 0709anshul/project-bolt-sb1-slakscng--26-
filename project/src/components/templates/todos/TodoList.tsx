import React from 'react';
import { Plus } from 'lucide-react';
import { TodoItem } from './TodoItem';
import { useTemplateItem } from '../../../hooks/templates/useTemplateItem';
import type { TaskTemplateItem } from '../../../types/templates';

type TodoListProps = {
  item: TaskTemplateItem;
  onChange: (updates: Partial<TaskTemplateItem>) => void;
  disabled?: boolean;
};

export function TodoList({ item, onChange, disabled }: TodoListProps) {
  const { todos, addTodo, removeTodo, updateTodo } = useTemplateItem(item, onChange);

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

      <div className="space-y-2">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onUpdate={(updates) => updateTodo(index, updates)}
            onRemove={() => removeTodo(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}