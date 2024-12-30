import React from 'react';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { DeleteButton } from '../common/DeleteButton';

type TaskActionsProps = {
  taskId: string;
  onDelete?: () => void;
};

export function TaskActions({ taskId, onDelete }: TaskActionsProps) {
  const { deleteTask, isLoading, canDelete } = useDeleteTask();

  if (!canDelete) return null;

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <DeleteButton
      onDelete={handleDelete}
      isLoading={isLoading}
      confirmMessage="Are you sure you want to delete this task? This action cannot be undone."
    />
  );
}