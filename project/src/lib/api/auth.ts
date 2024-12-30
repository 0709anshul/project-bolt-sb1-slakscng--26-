import { supabase } from '../supabase';
import type { Session } from '@supabase/supabase-js';

export async function getSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('Session fetch error:', error);
      return null;
    }
    return session;
  } catch (error) {
    console.warn('Session error:', error);
    return null;
  }
}

export async function checkFirstUser(): Promise<boolean> {
  try {
    // Simple health check first
    const { error: healthError } = await supabase
      .from('users')
      .select('id', { head: true });

    if (healthError) {
      console.warn('Health check failed:', healthError);
      return false;
    }

    // Then check user count
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.warn('User count check failed:', error);
      return false;
    }

    return count === 0;
  } catch (error) {
    console.warn('First user check failed:', error);
    return false;
  }
}

export async function refreshSession(): Promise<void> {
  try {
    const { error } = await supabase.auth.refreshSession();
    if (error) {
      console.warn('Session refresh failed:', error);
    }
  } catch (error) {
    console.warn('Session refresh error:', error);
  }
}