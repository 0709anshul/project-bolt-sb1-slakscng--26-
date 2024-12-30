import React, { useState } from 'react';
import { Plus, EyeOff } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';
import { useTaskTodos } from '../../hooks/useTaskTodos';
import { TodoItem } from './todos/TodoItem';
import type { Task } from '../../types/orders';

type TodoListProps = {
  task: Task;
};

export function TodoList({ task }: TodoListProps) {
  const { isAdmin, isManager, isStaff } = useUserRole();
  const canManageTodos = isAdmin || isManager || isStaff;
  const [newTodo, setNewTodo] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { todos, addTodo, toggleTodo, togglePrivate, deleteTodo, isLoading } = useTaskTodos(task.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || isLoading) return;

    try {
      await addTodo(newTodo.trim(), isPrivate);
      setNewTodo('');
      setIsPrivate(false);
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Subtasks</h3>

      {canManageTodos && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new subtask"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !newTodo.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1">
              <EyeOff className="h-4 w-4" />
              Make private (only visible to Leumas staff)
            </span>
          </label>
        </form>
      )}

      <div className="space-y-2">
        {todos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={(completed) => toggleTodo(todo.id, completed)}
            onTogglePrivate={(isPrivate) => togglePrivate(todo.id, isPrivate)}
            onDelete={() => deleteTodo(todo.id)}
            canManage={canManageTodos}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}