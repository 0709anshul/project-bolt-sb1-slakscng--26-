import React from 'react';
import { calculateTasksProgress } from '../../lib/utils/progress';
import type { Task } from '../../types/orders';

type OrderProgressBarProps = {
  tasks: Task[];
};

export function OrderProgressBar({ tasks }: OrderProgressBarProps) {
  const progress = calculateTasksProgress(tasks);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 min-w-[3rem] text-right">
        {progress}%
      </span>
    </div>
  );
}