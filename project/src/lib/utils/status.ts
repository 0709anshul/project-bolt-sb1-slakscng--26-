import type { TaskStatus } from '../../types/orders';

export const STATUS_STYLES: Record<TaskStatus, { bg: string; text: string }> = {
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
  pending_from_client: { bg: 'bg-orange-100', text: 'text-orange-800' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

export const STATUS_PROGRESS: Record<TaskStatus, number> = {
  completed: 100,
  in_progress: 70,
  pending_from_client: 20,
  pending: 0
};

export function formatStatus(status: TaskStatus | undefined): string {
  if (!status) return 'Unknown';
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getStatusStyles(status: TaskStatus | undefined): string {
  if (!status || !STATUS_STYLES[status]) {
    return 'bg-gray-100 text-gray-800';
  }
  const styles = STATUS_STYLES[status];
  return `${styles.bg} ${styles.text}`;
}

export function getStatusProgress(status: TaskStatus | undefined): number {
  if (!status || !STATUS_PROGRESS[status]) {
    return 0;
  }
  return STATUS_PROGRESS[status];
}