import type { TaskStatus } from '../../types/orders';

export const STATUS_PROGRESS: Record<TaskStatus, number> = {
  completed: 100,
  in_progress: 70,
  pending_from_client: 20,
  pending: 0
};

export function getStatusColor(status: TaskStatus): [number, number, number] {
  switch (status) {
    case 'completed':
      return [39, 174, 96]; // Green
    case 'in_progress':
      return [52, 152, 219]; // Blue
    case 'pending_from_client':
      return [230, 126, 34]; // Orange
    default:
      return [241, 196, 15]; // Yellow
  }
}