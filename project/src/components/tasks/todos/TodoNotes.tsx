import React from 'react';
import { SaveButton } from '../../common/SaveButton';
import { useTaskTodoNotes } from '../../../hooks/useTaskTodoNotes';
import type { TodoItem } from '../../../types/todos';

type TodoNotesProps = {
  todo: TodoItem;
  canManage: boolean;
};

export function TodoNotes({ todo, canManage }: TodoNotesProps) {
  const {
    notes,
    setNotes,
    save,
    isLoading,
    error,
    hasChanges
  } = useTaskTodoNotes(todo);

  if (!canManage && !todo.notes) {
    return null;
  }

  if (!canManage) {
    return (
      <div className="pl-8 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Notes</h4>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{todo.notes}</p>
      </div>
    );
  }

  return (
    <div className="pl-8 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Notes</h4>
        {hasChanges && (
          <SaveButton 
            onClick={save}
            isLoading={isLoading}
          />
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error.message}
        </div>
      )}

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={isLoading}
        placeholder="Add notes..."
        rows={3}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
      />
    </div>
  );
}