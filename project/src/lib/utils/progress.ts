import type { Task, TaskStatus } from '../types/orders';

// Define progress values for each status
export const STATUS_PROGRESS: Record<TaskStatus, number> = {
  pending: 0,
  pending_from_client: 20,
  in_progress: 60,
  completed: 100
};

// Calculate progress for a single task
export function getTaskProgress(status: TaskStatus): number {
  return STATUS_PROGRESS[status] || 0;
}

// Calculate average progress for multiple tasks
export function calculateTasksProgress(tasks: Task[] | null | undefined): number {
  if (!tasks?.length) return 0;
  
  const totalProgress = tasks.reduce((sum, task) => sum + getTaskProgress(task.status), 0);
  return Math.round(totalProgress / tasks.length);
}