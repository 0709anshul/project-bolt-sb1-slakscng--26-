import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';

type Stats = {
  activeOrders: number;
  pendingTasks: number;
  totalProducts: number;
  activeBrands: number;
};

export function useStats() {
  const [data, setData] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        // For brand users, filter by their organization
        const orgFilter = user.role === 'brand_user' ? 
          { organization_id: user.organization_id } : 
          {};

        // Execute all queries in parallel
        const [
          { count: activeOrders },
          { count: pendingTasks },
          { count: totalProducts },
          { count: activeBrands }
        ] = await Promise.all([
          // Active orders query
          supabase
            .from('production_orders')
            .select('*', { count: 'exact', head: true })
            .in('status', ['pending', 'in_progress'])
            .match(user.role === 'brand_user' ? orgFilter : {}),

          // Pending tasks query
          supabase
            .from('tasks')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending')
            .match(user.role === 'brand_user' ? { 'production_order.organization_id': user.organization_id } : {}),

          // Products query
          supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .match(user.role === 'brand_user' ? orgFilter : {}),

          // Active brands count - only for Leumas staff
          supabase
            .from('organizations')
            .select('*', { count: 'exact', head: true })
            .eq('type', 'Customer Brand')
        ]);

        setData({
          activeOrders: activeOrders || 0,
          pendingTasks: pendingTasks || 0,
          totalProducts: totalProducts || 0,
          // For brand users, always show 1 active brand (their own)
          activeBrands: user.role === 'brand_user' ? 1 : (activeBrands || 0)
        });
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch stats'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  return { data, isLoading, error };
}