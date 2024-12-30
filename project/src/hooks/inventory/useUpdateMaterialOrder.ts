import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { MaterialOrder } from '../../types/inventory';

type UpdateOrderData = {
  status: MaterialOrder['status'];
  dispatch_date: string | null;
  arrival_date: string | null;
  waybill_details: {
    number: string;
    carrier: string;
    tracking_url: string;
  } | null;
};

export function useUpdateMaterialOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateOrder = async (orderId: string, data: UpdateOrderData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('material_orders')
        .update({
          status: data.status,
          dispatch_date: data.dispatch_date || null,
          arrival_date: data.arrival_date || null,
          waybill_details: data.waybill_details
        })
        .eq('id', orderId);

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