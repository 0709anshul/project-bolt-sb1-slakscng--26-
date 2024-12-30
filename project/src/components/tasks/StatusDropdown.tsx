import React, { useState } from 'react';
import { useUpdateTaskStatus } from '../../hooks/useUpdateTaskStatus';
import type { Task, TaskStatus } from '../../types/orders';

type StatusDropdownProps = {
  task: Task;
};

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'pending_from_client', label: 'Pending from Client' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const STATUS_STYLES: Record<TaskStatus, { bg: string; text: string }> = {
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
  pending_from_client: { bg: 'bg-orange-100', text: 'text-orange-800' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

export function StatusDropdown({ task }: StatusDropdownProps) {
  const { updateStatus, isLoading, canUpdateStatus } = useUpdateTaskStatus();
  const [optimisticStatus, setOptimisticStatus] = useState<TaskStatus>(task.status);
  const statusStyle = STATUS_STYLES[optimisticStatus];

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    if (!STATUS_OPTIONS.find(opt => opt.value === newStatus)) return;
    
    // Optimistic update
    setOptimisticStatus(newStatus);
    
    try {
      await updateStatus(task.id, newStatus);
    } catch (error) {
      // Revert on error
      setOptimisticStatus(task.status);
      console.error('Error updating task status:', error);
    }
  };

  // Keep optimistic status in sync with prop
  React.useEffect(() => {
    setOptimisticStatus(task.status);
  }, [task.status]);

  if (!canUpdateStatus) {
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text}`}>
        {STATUS_OPTIONS.find(opt => opt.value === optimisticStatus)?.label}
      </span>
    );
  }

  return (
    <select
      value={optimisticStatus}
      onChange={handleStatusChange}
      disabled={isLoading}
      className={`
        px-3 py-1 rounded-full text-sm border-0
        ${statusStyle.bg} ${statusStyle.text}
        ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      `}
    >
      {STATUS_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}