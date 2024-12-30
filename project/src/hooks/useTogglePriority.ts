import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useTogglePriority() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin, isManager } = useUserRole();

  const togglePriority = async (orderId: string, currentPriority: boolean) => {
    if (!isAdmin && !isManager) {
      const error = new Error('Insufficient permissions');
      setError(error);
      throw error;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('production_orders')
        .update({ is_priority: !currentPriority })
        .eq('id', orderId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update priority');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    togglePriority, 
    isLoading, 
    error, 
    canToggle: isAdmin || isManager 
  };
}