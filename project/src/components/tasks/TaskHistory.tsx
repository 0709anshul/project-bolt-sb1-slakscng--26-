import React from 'react';
import { useTaskHistory } from '../../hooks/useTaskHistory';
import { formatDate } from '../../utils/date';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { User2 } from 'lucide-react';
import type { Task } from '../../types/orders';

type TaskHistoryProps = {
  task: Task;
};

export function TaskHistory({ task }: TaskHistoryProps) {
  const { data: history, isLoading, error } = useTaskHistory(task.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!history?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No history available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div key={entry.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <User2 className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {entry.user?.full_name || 'Unknown User'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(entry.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}