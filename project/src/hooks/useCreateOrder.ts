import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { CreateOrderData } from '../types/orders';

export function useCreateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  const create = async (data: CreateOrderData) => {
    if (!user) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      // For brand users, ensure organization_id matches their own
      const orderData = {
        ...data,
        owner_id: user.id,
        organization_id: user.role === 'brand_user' ? user.organization_id : data.organization_id,
        status: 'pending'
      };

      const { error: createError } = await supabase
        .from('production_orders')
        .insert(orderData);

      if (createError) throw createError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create order');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}