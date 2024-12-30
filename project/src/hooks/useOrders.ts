import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { ProductionOrder } from '../types/orders';

export function useOrders() {
  const [data, setData] = useState<ProductionOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      let query = supabase
        .from('production_orders')
        .select(`
          id,
          po_number,
          quantity,
          order_type,
          is_priority,
          status,
          due_date,
          details,
          attachments,
          parent_order_id,
          split_reason,
          product:products(
            id,
            name,
            organization:organizations(
              id,
              name
            )
          ),
          organization:organizations(
            id,
            name
          ),
          tasks(
            id,
            details,
            status,
            start_date,
            due_date,
            duration_days,
            owner:users(
              id,
              full_name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (user.role === 'brand_user') {
        query = query.eq('organization_id', user.organization_id);
      }

      const { data: orders, error: ordersError } = await query;

      if (ordersError) throw ordersError;
      setData(orders);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Error loading orders'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return { data, isLoading, error, refetch: fetchOrders };
}