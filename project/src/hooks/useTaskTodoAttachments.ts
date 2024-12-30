import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TodoItem } from '../types/todos';
import type { FileUploadResult } from '../lib/storage';

export function useTaskTodoAttachments(todo: TodoItem) {
  const [attachments, setAttachments] = useState<FileUploadResult[]>(todo.attachments || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = JSON.stringify(attachments) !== JSON.stringify(todo.attachments);

  const save = async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('task_todos')
        .update({ attachments })
        .eq('id', todo.id);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to save attachments');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    attachments,
    setAttachments,
    save,
    hasChanges,
    isLoading,
    error
  };
}