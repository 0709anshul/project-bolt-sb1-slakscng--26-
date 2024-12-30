import React, { useState } from 'react';
import { useUpdateTaskStatus } from '../../../hooks/useUpdateTaskStatus';
import { SaveButton } from '../../common/SaveButton';
import { TaskStatusSelect } from './TaskStatusSelect';
import type { TaskStatus as TaskStatusType } from '../../../types/orders';

type TaskStatusEditProps = {
  taskId: string;
  currentStatus: TaskStatusType;
};

export function TaskStatusEdit({ taskId, currentStatus }: TaskStatusEditProps) {
  const [status, setStatus] = useState<TaskStatusType>(currentStatus);
  const { updateStatus, isLoading, canUpdateStatus } = useUpdateTaskStatus();
  const hasChanges = status !== currentStatus;

  const handleSave = async () => {
    if (!hasChanges) return;
    
    try {
      await updateStatus(taskId, status);
    } catch (error) {
      console.error('Error updating task status:', error);
      setStatus(currentStatus);
    }
  };

  if (!canUpdateStatus) {
    return <TaskStatusSelect status={currentStatus} readOnly />;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        {hasChanges && (
          <SaveButton 
            onClick={handleSave}
            isLoading={isLoading}
          />
        )}
      </div>

      <TaskStatusSelect
        status={status}
        onChange={setStatus}
        disabled={isLoading}
      />
    </div>
  );
}