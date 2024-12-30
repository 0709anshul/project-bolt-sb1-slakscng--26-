import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useDeleteTask() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canDelete = isAdmin || isManager;

  const deleteTask = async (taskId: string) => {
    if (!canDelete) {
      throw new Error('Insufficient permissions');
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTask, isLoading, canDelete };
}