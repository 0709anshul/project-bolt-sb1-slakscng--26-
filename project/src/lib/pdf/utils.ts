import type { TaskStatus } from '../../types/orders';

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

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}