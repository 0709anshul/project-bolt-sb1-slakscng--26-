import React, { useState } from 'react';
import { formatDate } from '../../utils/date';
import { TaskWorkspaceModal } from './TaskWorkspaceModal';
import type { Task } from '../../types/orders';

type TaskRowProps = {
  task: Task;
};

export function TaskRow({ task }: TaskRowProps) {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsWorkspaceOpen(true)}
        className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{task.details}</span>
          {task.is_priority && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
              Priority
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Due: {formatDate(task.due_date)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.status}
          </span>
        </div>
      </div>

      <TaskWorkspaceModal
        task={task}
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
      />
    </>
  );
}