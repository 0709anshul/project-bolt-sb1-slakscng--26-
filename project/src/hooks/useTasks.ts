import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { Task } from '../types/orders';

export function useTasks(status?: string) {
  const [data, setData] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;

      try {
        setIsLoading(true);
        let query = supabase
          .from('tasks')
          .select(`
            *,
            owner:users!owner_id(*),
            production_order:production_orders!inner(
              id,
              po_number,
              quantity,
              organization_id,
              product:products!inner(
                id,
                name
              ),
              organization:organizations!inner(
                id,
                name
              )
            )
          `);

        // Apply status filter if provided
        if (status) {
          query = query.eq('status', status);
        }

        // Filter by organization for brand users
        if (user.role === 'brand_user') {
          query = query.eq('production_order.organization_id', user.organization_id);
        }

        const { data: tasks, error: queryError } = await query;

        if (queryError) throw queryError;
        setData(tasks);
        setError(null);
      } catch (err) {
        console.error('Failed to load tasks:', err);
        setError(err instanceof Error ? err : new Error('Failed to load tasks'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [status, user]);

  return { data, isLoading, error };
}