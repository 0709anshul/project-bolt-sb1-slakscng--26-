import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TodoItem } from '../types/todos';

export function useTaskTodoNotes(todo: TodoItem) {
  const [notes, setNotes] = useState(todo.notes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = notes !== todo.notes;

  const save = async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('task_todos')
        .update({ notes })
        .eq('id', todo.id);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to save notes');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notes,
    setNotes,
    save,
    hasChanges,
    isLoading,
    error
  };
}