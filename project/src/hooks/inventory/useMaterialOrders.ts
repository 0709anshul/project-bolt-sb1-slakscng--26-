import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { MaterialOrder } from '../../types/inventory';

export function useMaterialOrders() {
  const [data, setData] = useState<MaterialOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data: orders, error: queryError } = await supabase
          .from('material_orders')
          .select(`
            *,
            material:materials(*),
            production_order:production_orders!production_order_id(
              id,
              po_number,
              quantity,
              status,
              product:products(
                id,
                name
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (queryError) throw queryError;
        setData(orders);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading orders'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { data, isLoading, error };
}