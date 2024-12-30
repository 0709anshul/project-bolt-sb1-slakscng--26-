import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { UpdateOrderData } from '../types/orders';

export function useUpdateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateOrder = async (id: string, data: UpdateOrderData) => {
    if (!id) {
      throw new Error('Order ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('production_orders')
        .update({
          details: data.details?.trim() || null,
          attachments: data.attachments || []
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update order');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateOrder, isLoading, error };
}