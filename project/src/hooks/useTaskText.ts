import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Task } from '../types/orders';

export function useTaskText(task: Task) {
  const [text, setText] = useState(task.proof_of_work || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = text !== task.proof_of_work;

  const save = useCallback(async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ proof_of_work: text })
        .eq('id', task.id);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to save text');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [task.id, text, hasChanges]);

  return { text, setText, save, hasChanges, isLoading, error };
}