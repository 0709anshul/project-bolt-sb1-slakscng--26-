import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { RealtimeFilter, RealtimeCallback, RealtimeSubscription } from './types';

class ChannelManager {
  private channels = new Map<string, RealtimeChannel>();
  private callbacks = new Map<string, Set<RealtimeCallback>>();

  private getChannelKey(filter: RealtimeFilter): string {
    return `${filter.table}-${filter.event || '*'}-${filter.filter || '*'}`;
  }

  subscribe(filter: RealtimeFilter, callback: RealtimeCallback): RealtimeSubscription {
    const key = this.getChannelKey(filter);
    
    // Add callback to the set
    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, new Set());
    }
    this.callbacks.get(key)?.add(callback);

    // Create channel if it doesn't exist
    if (!this.channels.has(key)) {
      const channel = supabase.channel(key)
        .on(
          'postgres_changes',
          { 
            event: filter.event || '*',
            schema: filter.schema || 'public',
            table: filter.table,
            filter: filter.filter
          },
          (payload) => {
            // Call all callbacks registered for this channel
            this.callbacks.get(key)?.forEach(cb => cb(payload));
          }
        )
        .subscribe();

      this.channels.set(key, channel);
    }

    // Return unsubscribe function
    return {
      unsubscribe: () => {
        const callbacks = this.callbacks.get(key);
        if (callbacks) {
          callbacks.delete(callback);
          if (callbacks.size === 0) {
            this.cleanup(key);
          }
        }
      }
    };
  }

  private cleanup(key: string): void {
    const channel = this.channels.get(key);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(key);
      this.callbacks.delete(key);
    }
  }

  unsubscribeAll(): void {
    this.channels.forEach(channel => channel.unsubscribe());
    this.channels.clear();
    this.callbacks.clear();
  }
}

// Export singleton instance
export const channelManager = new ChannelManager();