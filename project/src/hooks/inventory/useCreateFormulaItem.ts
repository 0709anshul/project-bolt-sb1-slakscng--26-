import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type CreateFormulaItemData = {
  product_id: string;
  material_id: string;
  quantity: number;
};

export function useCreateFormulaItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createItem = async (data: CreateFormulaItemData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: createError } = await supabase
        .from('product_formulas')
        .insert(data);

      if (createError) throw createError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create formula item');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createItem, isLoading, error };
}