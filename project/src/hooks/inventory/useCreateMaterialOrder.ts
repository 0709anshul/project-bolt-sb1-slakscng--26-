import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type CreateOrderData = {
  material_id: string;
  quantity: number;
  order_date: string;
  production_order_id: string;
};

export function useCreateMaterialOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (data: CreateOrderData) => {
    if (!data.production_order_id) {
      throw new Error('Production order ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: createError } = await supabase
        .from('material_orders')
        .insert({
          material_id: data.material_id,
          quantity: data.quantity,
          order_date: data.order_date,
          production_order_id: data.production_order_id,
          status: 'pending'
        });

      if (createError) throw createError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create order');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error };
}