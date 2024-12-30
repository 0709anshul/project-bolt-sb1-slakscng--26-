import React from 'react';
import { TaskCard } from '../tasks/TaskCard';
import { LimitedList } from '../common/LimitedList';
import { useTasks } from '../../hooks/useTasks';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function TasksSection() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Production Tasks</h2>
      <LimitedList
        items={tasks}
        renderItem={(task) => (
          <TaskCard key={task.id} task={task} />
        )}
        emptyMessage="No tasks found"
      />
    </div>
  );
}