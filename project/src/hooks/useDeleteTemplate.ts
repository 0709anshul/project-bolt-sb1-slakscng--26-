import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useDeleteTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTemplate = async (templateId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Delete template (items will be cascade deleted)
      const { error: deleteError } = await supabase
        .from('task_templates')
        .delete()
        .eq('id', templateId);

      if (deleteError) throw deleteError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to delete template');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTemplate, isLoading, error };
}