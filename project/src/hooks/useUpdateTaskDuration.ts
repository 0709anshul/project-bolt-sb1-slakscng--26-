import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useUpdateTaskDuration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager } = useUserRole();

  const updateDuration = async (taskId: string, duration: number) => {
    if (!isAdmin && !isManager) {
      throw new Error('Only admins and managers can update task duration');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ duration_days: duration })
        .eq('id', taskId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update duration');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    updateDuration, 
    isLoading, 
    error,
    canUpdateDuration: isAdmin || isManager 
  };
}