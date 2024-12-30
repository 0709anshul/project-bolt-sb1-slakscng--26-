import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useDeleteProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canDelete = isAdmin || isManager;

  const deleteProduct = async (productId: string) => {
    if (!canDelete) {
      throw new Error('Insufficient permissions');
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct, isLoading, canDelete };
}