import { supabase } from '../supabase';
import type { Session } from '@supabase/supabase-js';

// Initialize auth state
let currentSession: Session | null = null;

// Get current session without network request
export function getCurrentSession(): Session | null {
  return currentSession;
}

// Get fresh session from server
export async function getSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    currentSession = session;
    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    currentSession = null;
    return null;
  }
}

// Attempt to refresh the session
export async function refreshSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) {
      // Clear invalid session
      currentSession = null;
      clearAuthData();
      return null;
    }
    
    currentSession = session;
    return session;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    clearAuthData();
    return null;
  }
}

// Clear all auth-related data
function clearAuthData() {
  localStorage.removeItem('sb-token');
  localStorage.removeItem('sb-refresh-token');
  localStorage.removeItem('supabase.auth.token');
}

// Listen for auth state changes
export function onSessionChange(callback: (session: Session | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    currentSession = session;
    callback(session);
  });

  return subscription;
}