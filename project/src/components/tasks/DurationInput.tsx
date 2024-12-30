import React, { useState } from 'react';
import { useUpdateTaskDuration } from '../../hooks/useUpdateTaskDuration';
import type { Task } from '../../types/orders';

type DurationInputProps = {
  task: Task;
};

export function DurationInput({ task }: DurationInputProps) {
  const { updateDuration, isLoading, canUpdateDuration } = useUpdateTaskDuration();
  const [duration, setDuration] = useState(task.duration_days);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canUpdateDuration || isLoading) return;

    try {
      await updateDuration(task.id, duration);
    } catch (error) {
      console.error('Error updating duration:', error);
      setDuration(task.duration_days);
    }
  };

  if (!canUpdateDuration) {
    return <div className="text-sm text-gray-600">{task.duration_days} days</div>;
  }

  return (
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
      {duration !== task.duration_days && (
        <button
          type="submit"
          disabled={isLoading}
          className="px-2 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      )}
    </form>
  );
}