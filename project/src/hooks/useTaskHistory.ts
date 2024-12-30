import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskHistoryEntry } from '../types/tasks';

export function useTaskHistory(taskId: string) {
  const [data, setData] = useState<TaskHistoryEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: history, error: historyError } = await supabase
          .from('task_history')
          .select(`
            id,
            task_id,
            user_id,
            action,
            details,
            created_at,
            user:users(
              id,
              full_name,
              role
            )
          `)
          .eq('task_id', taskId)
          .order('created_at', { ascending: false });

        if (historyError) throw historyError;
        setData(history);
      } catch (e) {
        console.error('Error loading task history:', e);
        setError(e instanceof Error ? e : new Error('Error loading task history'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [taskId]);

  return { data, isLoading, error };
}