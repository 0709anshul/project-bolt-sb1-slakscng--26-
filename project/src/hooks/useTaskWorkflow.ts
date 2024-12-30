import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRealtimeSubscription } from './useRealtimeSubscription';
import type { Task } from '../types/orders';

export function useTaskWorkflow(taskId: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTask = async () => {
    try {
      setIsLoading(true);
      const { data, error: queryError } = await supabase
        .from('tasks')
        .select(`
          *,
          owner:users!owner_id(*),
          production_order:production_orders!inner (
            id,
            po_number,
            quantity,
            organization:organizations!inner (
              id,
              name
            )
          )
        `)
        .eq('id', taskId)
        .single();

      if (queryError) throw queryError;
      setTask(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load task'));
      setTask(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTask();
  }, [taskId]);

  // Subscribe to real-time updates
  useRealtimeSubscription(
    { table: 'tasks', filter: `id=eq.${taskId}` },
    fetchTask
  );

  return { task, isLoading, error };
}