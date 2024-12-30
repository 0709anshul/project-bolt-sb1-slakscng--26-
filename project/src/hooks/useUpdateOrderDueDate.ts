import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useUpdateOrderDueDate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager } = useUserRole();

  const updateDueDate = async (orderId: string, dueDate: string | null) => {
    if (!isAdmin && !isManager) {
      throw new Error('Only admins and managers can update due dates');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('production_orders')
        .update({ due_date: dueDate })
        .eq('id', orderId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update due date');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    updateDueDate, 
    isLoading, 
    error,
    canUpdateDueDate: isAdmin || isManager 
  };
}