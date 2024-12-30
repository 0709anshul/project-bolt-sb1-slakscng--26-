import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useDeleteOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canDelete = isAdmin || isManager;

  const deleteOrder = async (orderId: string) => {
    if (!canDelete) {
      throw new Error('Insufficient permissions');
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('production_orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteOrder, isLoading, canDelete };
}