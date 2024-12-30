import React from 'react';
import { getTaskProgress } from '../../lib/utils/progress';
import type { TaskStatus } from '../../types/orders';

type TaskProgressBarProps = {
  status?: TaskStatus;
  progress?: number;
};

export function TaskProgressBar({ status, progress }: TaskProgressBarProps) {
  // Use either direct progress value or calculate from status
  const progressValue = progress ?? (status ? getTaskProgress(status) : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressValue}%` }}
        />
      </div>
      <span className="text-sm text-gray-500">
        {progressValue}%
      </span>
    </div>
  );
}