import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BatchRecord } from '../types/orders';

export function useBatchRecord(orderId: string) {
  const [data, setData] = useState<BatchRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBatchRecord = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: record, error: recordError } = await supabase
        .from('batch_records')
        .select('*')
        .eq('production_order_id', orderId)
        .maybeSingle();

      if (recordError) throw recordError;
      setData(record);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Error loading batch record'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchRecord();
  }, [orderId]);

  const updateBatchRecord = async (details: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('batch_records')
          .update({ details })
          .eq('id', data.id);

        if (updateError) throw updateError;
      } else {
        // Create new record
        const { error: createError } = await supabase
          .from('batch_records')
          .insert({
            production_order_id: orderId,
            details
          });

        if (createError) throw createError;
      }

      // Refresh data after update
      await fetchBatchRecord();
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update batch record');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, updateBatchRecord };
}