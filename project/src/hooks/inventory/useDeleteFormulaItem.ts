import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function useDeleteFormulaItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('product_formulas')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to delete formula item');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteItem, isLoading, error };
}