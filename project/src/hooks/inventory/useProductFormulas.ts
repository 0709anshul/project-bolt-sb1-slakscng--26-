import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ProductFormula } from '../../types/inventory';

export function useProductFormulas(productId?: string) {
  const [data, setData] = useState<ProductFormula[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFormulas() {
      if (!productId) {
        setData(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data: formulas, error: queryError } = await supabase
          .from('product_formulas')
          .select(`
            *,
            material:materials(*)
          `)
          .eq('product_id', productId)
          .order('created_at');

        if (queryError) throw queryError;
        setData(formulas);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading formulas'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormulas();
  }, [productId]);

  return { data, isLoading, error };
}