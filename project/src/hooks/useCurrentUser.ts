import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

// Cache the current user data
let cachedUser: User | null = null;

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(cachedUser);
  const [isLoading, setIsLoading] = useState(!cachedUser);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      try {
        // Return cached user if available
        if (cachedUser) {
          setUser(cachedUser);
          setIsLoading(false);
          return;
        }

        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
          setUser(null);
          return;
        }

        const { data, error: userError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            role,
            organization_id,
            organization:organizations!inner(
              id,
              name
            )
          `)
          .eq('id', authUser.id)
          .single();

        if (userError) throw userError;
        if (!mounted) return;
        
        // Cache the user data
        cachedUser = data;
        setUser(data);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e : new Error('Failed to fetch user'));
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, isLoading, error };
}