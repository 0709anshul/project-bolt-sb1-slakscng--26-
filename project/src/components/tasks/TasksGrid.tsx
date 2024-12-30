import React from 'react';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { Task } from '../../types/orders';

type TasksGridProps = {
  tasks: Task[] | null;
  isLoading: boolean;
  error: Error | null;
};

export function TasksGrid({ tasks, isLoading, error }: TasksGridProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!tasks?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No tasks found matching your filters</p>
    </div>
  );
}