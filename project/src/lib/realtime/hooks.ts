import { useEffect, useRef } from 'react';
import { channelManager } from './channelManager';
import type { RealtimeFilter, RealtimeCallback } from './types';

export function useRealtimeSubscription(
  filter: RealtimeFilter,
  callback: RealtimeCallback,
  deps: any[] = []
): void {
  const filterRef = useRef(filter);
  filterRef.current = filter;

  useEffect(() => {
    const subscription = channelManager.subscribe(filterRef.current, callback);
    return () => subscription.unsubscribe();
  }, [filter.table, filter.event, filter.filter, ...deps]);
}