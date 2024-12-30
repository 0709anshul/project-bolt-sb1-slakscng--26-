import React from 'react';
import { useUpdateTaskStatus } from '../../hooks/useUpdateTaskStatus';
import { getStatusStyles, formatStatus } from '../../lib/utils/status';
import type { TaskStatus as TaskStatusType } from '../../types/orders';

const STATUS_OPTIONS: TaskStatusType[] = [
  'pending',
  'pending_from_client',
  'in_progress',
  'completed'
];

type TaskStatusSelectProps = {
  taskId: string;
  currentStatus: TaskStatusType;
};

export function TaskStatusSelect({ taskId, currentStatus }: TaskStatusSelectProps) {
  const { updateStatus, isLoading, canUpdateStatus } = useUpdateTaskStatus();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatusType;
    try {
      await updateStatus(taskId, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (!canUpdateStatus) {
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(currentStatus)}`}>
        {formatStatus(currentStatus)}
      </span>
    );
  }

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isLoading}
      className={`
        w-full px-3 py-2 rounded-lg text-sm border
        ${getStatusStyles(currentStatus)}
        ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      `}
    >
      {STATUS_OPTIONS.map(status => (
        <option key={status} value={status}>
          {formatStatus(status)}
        </option>
      ))}
    </select>
  );
}