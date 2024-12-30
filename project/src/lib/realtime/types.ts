import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export type RealtimeFilter = {
  table: string;
  event?: RealtimeEvent;
  schema?: string;
  filter?: string;
};

export type RealtimeCallback = (payload: RealtimePostgresChangesPayload<any>) => void;