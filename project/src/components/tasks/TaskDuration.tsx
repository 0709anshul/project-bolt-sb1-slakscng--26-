import React from 'react';
import { useTaskField } from '../../hooks/useTaskField';
import { useUserRole } from '../../hooks/useUserRole';
import type { Task } from '../../types/orders';

type TaskDurationProps = {
  task: Task;
};

export function TaskDuration({ task }: TaskDurationProps) {
  const { isAdmin, isManager } = useUserRole();
  const {
    value: duration,
    setValue: setDuration,
    save,
    isLoading,
    error,
    hasChanges
  } = useTaskField<number>(task.id, 'duration_days', task.duration_days);

  const canUpdateDuration = isAdmin || isManager;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save();
  };

  if (!canUpdateDuration) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <div className="text-sm text-gray-600">{duration} days</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Duration</label>
      {error && (
        <div className="text-sm text-red-600">{error.message}</div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          disabled={isLoading}
          className="w-20 px-2 py-1 text-sm border rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span className="text-sm text-gray-600">days</span>
        {hasChanges && (
          <button
            type="submit"
            disabled={isLoading}
            className="px-2 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        )}
      </form>
    </div>
  );
}