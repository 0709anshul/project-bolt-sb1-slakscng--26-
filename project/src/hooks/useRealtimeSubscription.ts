import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeFilter } from '../lib/realtime/types';

export function useRealtimeSubscription(
  filter: RealtimeFilter,
  callback: () => void
) {
  useEffect(() => {
    // Create channel for this subscription
    const channel = supabase.channel(`realtime:${filter.table}`)
      .on(
        'postgres_changes',
        { 
          event: filter.event || '*',
          schema: filter.schema || 'public',
          table: filter.table,
          filter: filter.filter
        },
        () => callback()
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, [filter.table, filter.event, filter.filter, callback]);
}