import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

// Track active channels and their subscriber counts
const channels = new Map<string, { channel: RealtimeChannel; subscribers: number }>();

export function subscribeToChanges(
  table: string,
  callback: () => void
): () => void {
  const channelKey = `realtime:${table}`;
  
  // Get or create channel
  let channelData = channels.get(channelKey);
  
  if (!channelData) {
    // Create new channel
    const channel = supabase.channel(channelKey)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => callback()
      )
      .subscribe();

    channelData = { channel, subscribers: 0 };
    channels.set(channelKey, channelData);
  }

  // Increment subscriber count
  channelData.subscribers++;

  // Return cleanup function
  return () => {
    const data = channels.get(channelKey);
    if (data) {
      data.subscribers--;
      
      // If no more subscribers, cleanup channel
      if (data.subscribers === 0) {
        data.channel.unsubscribe();
        channels.delete(channelKey);
      }
    }
  };
}