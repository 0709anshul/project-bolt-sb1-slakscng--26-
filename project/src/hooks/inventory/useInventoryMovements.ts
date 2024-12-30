import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { InventoryMovement } from '../../types/inventory';

export function useInventoryMovements() {
  const [data, setData] = useState<InventoryMovement[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMovements() {
      try {
        const { data: movements, error: queryError } = await supabase
          .from('inventory_movements')
          .select(`
            *,
            material:materials(*),
            moved_by_user:users(*)
          `)
          .order('moved_at', { ascending: false });

        if (queryError) throw queryError;
        setData(movements);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading movements'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovements();
  }, []);

  return { data, isLoading, error };
}