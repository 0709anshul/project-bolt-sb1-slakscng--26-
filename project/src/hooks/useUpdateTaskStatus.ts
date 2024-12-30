import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';
import type { TaskStatus } from '../types/orders';

export function useUpdateTaskStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager } = useUserRole();

  const updateStatus = async (taskId: string, status: TaskStatus) => {
    if (!isAdmin && !isManager) {
      const error = new Error('Only admins and managers can update task status');
      setError(error);
      throw error;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update task status');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    updateStatus, 
    isLoading, 
    error,
    canUpdateStatus: isAdmin || isManager 
  };
}