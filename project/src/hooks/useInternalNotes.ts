import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Task } from '../types/orders';

export function useInternalNotes(task: Task) {
  const [notes, setNotes] = useState(task.internal_notes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = notes !== task.internal_notes;

  const save = useCallback(async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Ensure notes is a string
      const sanitizedNotes = notes?.toString() || '';
      
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          internal_notes: sanitizedNotes
        })
        .eq('id', task.id)
        .select()
        .single();

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to save notes');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [task.id, notes, hasChanges]);

  return { 
    notes, 
    setNotes,
    save, 
    hasChanges, 
    isLoading, 
    error 
  };
}