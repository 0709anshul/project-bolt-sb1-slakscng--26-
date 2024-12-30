import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useLeumasUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        
        // Include organization in select and use proper join syntax
        const { data, error: queryError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            role,
            organization:organizations!inner(
              id,
              name
            )
          `)
          .eq('organizations.name', 'Leumas')
          .in('role', ['admin', 'manager', 'staff']);

        if (queryError) throw queryError;
        setUsers(data);
      } catch (e) {
        console.error('Error fetching users:', e);
        setError(e instanceof Error ? e : new Error('Failed to load users'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, isLoading, error };
}