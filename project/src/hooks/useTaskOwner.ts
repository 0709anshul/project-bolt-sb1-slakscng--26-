import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';
import type { Task } from '../types/orders';

export function useTaskOwner(task: Task) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager } = useUserRole();

  const canUpdateOwner = isAdmin || isManager;

  const updateOwner = async (ownerId: string | null) => {
    if (!canUpdateOwner) {
      throw new Error('Only admins and managers can update task owners');
    }

    if (!task.id) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ 
          owner_id: ownerId,
          updated_at: new Date().toISOString()
        })
        .eq('id', task.id);

      if (updateError) throw updateError;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update task owner');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateOwner,
    isLoading,
    error,
    canUpdateOwner
  };
}