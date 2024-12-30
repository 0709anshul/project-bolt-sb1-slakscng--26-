import { format } from 'date-fns';

export function formatDate(date: string | Date | null): string {
  if (!date) return 'Not set';
  
  try {
    return format(new Date(date), 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}