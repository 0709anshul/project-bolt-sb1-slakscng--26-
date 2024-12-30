import React from 'react';
import type { Task } from '../../types/orders';

type TaskCardHeaderProps = {
  task: Task;
};

export function TaskCardHeader({ task }: TaskCardHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-semibold">{task.details}</h3>
      {task.is_priority && (
        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
          Priority
        </span>
      )}
    </div>
  );
}