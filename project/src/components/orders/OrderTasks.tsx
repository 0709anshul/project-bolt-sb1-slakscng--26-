import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Task } from '../../types';

type OrderTasksProps = {
  tasks: Task[];
};

export function OrderTasks({ tasks }: OrderTasksProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className="flex items-center gap-2">
            {task.status === 'completed' ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
            <span className="font-medium">{task.name}</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
}