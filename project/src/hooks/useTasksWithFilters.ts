import { useMemo } from 'react';
import { useTasks } from './useTasks';
import type { Task } from '../types/orders';

type TaskFilters = {
  poNumber: string;
  dueDate: string;
  status: string;
  priority: string;
  owner: string;
  showMyTasks: boolean;
};

export function useTasksWithFilters(filters: TaskFilters) {
  const { data: tasks, isLoading, error } = useTasks();

  const filteredTasks = useMemo(() => {
    if (!tasks) return null;

    return tasks.filter(task => {
      // Filter by PO number
      if (filters.poNumber && !task.production_order?.po_number.toLowerCase().includes(filters.poNumber.toLowerCase())) {
        return false;
      }

      // Filter by status
      if (filters.status && task.status !== filters.status.toLowerCase()) {
        return false;
      }

      // Filter by priority
      if (filters.priority === 'priority' && !task.is_priority) {
        return false;
      }

      // Filter by due date
      if (filters.dueDate && task.due_date !== filters.dueDate) {
        return false;
      }

      // Filter by owner
      if (filters.owner) {
        if (filters.owner === 'unassigned' && task.owner_id !== null) {
          return false;
        }
        if (filters.owner !== 'unassigned' && task.owner_id !== filters.owner) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, filters]);

  return { tasks: filteredTasks, isLoading, error };
}