import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getSession, refreshSession, onSessionChange } from '../lib/auth/session';
import type { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        // Try to get existing session
        let currentSession = await getSession();
        
        // If no session, try to refresh
        if (!currentSession) {
          currentSession = await refreshSession();
        }

        if (mounted) {
          setSession(currentSession);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    // Initialize auth
    initAuth();

    // Listen for auth changes
    const subscription = onSessionChange((newSession) => {
      if (mounted) {
        setSession(newSession);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}