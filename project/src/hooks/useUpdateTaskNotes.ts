import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useUpdateTaskNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager, isStaff } = useUserRole();

  const updateNotes = async (taskId: string, notes: string) => {
    if (!isAdmin && !isManager && !isStaff) {
      throw new Error('Only Leumas staff can update internal notes');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ internal_notes: notes })
        .eq('id', taskId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update notes');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    updateNotes, 
    isLoading, 
    error,
    canUpdateNotes: isAdmin || isManager || isStaff 
  };
}