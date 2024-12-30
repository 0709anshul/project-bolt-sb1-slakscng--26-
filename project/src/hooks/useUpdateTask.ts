import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Task } from '../types/orders';

type UpdateTaskData = Partial<Pick<Task, 'has_external_dependency'>>;

export function useUpdateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTask = async (taskId: string, data: UpdateTaskData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', taskId);

      if (updateError) throw updateError;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update task');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTask, isLoading, error };
}