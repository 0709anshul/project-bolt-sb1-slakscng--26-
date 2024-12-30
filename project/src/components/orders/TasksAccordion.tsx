import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User2, Clock } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { TaskProgressBar } from '../tasks/TaskProgressBar';
import { calculateTasksProgress } from '../../lib/utils/progress';
import type { Task } from '../../types/orders';

type TasksAccordionProps = {
  tasks: Task[];
};

export function TasksAccordion({ tasks }: TasksAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate overall progress
  const averageProgress = calculateTasksProgress(tasks);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Tasks ({tasks.length})</span>
          <TaskProgressBar progress={averageProgress} />
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium">{task.details}</div>
                <div className="mt-1 space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User2 className="h-4 w-4" />
                    <span>{task.owner?.full_name || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Due: {formatDate(task.due_date)}</span>
                  </div>
                </div>
              </div>
              <TaskProgressBar status={task.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}