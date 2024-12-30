import React, { useState } from 'react';
import { Clock, Calendar, Flag, User2 } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { TaskWorkspace } from './TaskWorkspace';
import { TaskProgressBar } from './TaskProgressBar';
import { TaskCardHeader } from './TaskCardHeader';
import { TaskCardInfo } from './TaskCardInfo';
import { TaskStatus } from './TaskStatus';
import { TaskActions } from './TaskActions';
import { ExternalDependencyBadge } from './ExternalDependencyBadge';
import { cn } from '../../lib/utils/styles';
import type { Task } from '../../types/orders';

type TaskCardProps = {
  task: Task;
  onUpdate?: () => void;
};

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const hasExternalDependency = task.has_external_dependency;

  return (
    <>
      <div 
        onClick={() => setIsWorkspaceOpen(true)}
        className={cn(
          "bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer",
          hasExternalDependency && "bg-red-50"
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3">
              <TaskCardHeader task={task} />
              <ExternalDependencyBadge hasExternalDependency={hasExternalDependency} />
            </div>
            <TaskCardInfo task={task} />
          </div>
          <div className="flex items-center gap-2">
            <TaskStatus status={task.status} />
            <TaskActions taskId={task.id} onDelete={onUpdate} />
          </div>
        </div>

        <div className="space-y-3">
          {/* Task Owner */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User2 className="h-4 w-4" />
            <span>{task.owner?.full_name || 'Unassigned'}</span>
          </div>

          {/* Task Dates and Duration */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Start: {formatDate(task.start_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Due: {formatDate(task.due_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>{task.duration_days} days</span>
            </div>
          </div>
          
          <TaskProgressBar status={task.status} />
        </div>
      </div>

      <TaskWorkspace
        task={task}
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
      />
    </>
  );
}