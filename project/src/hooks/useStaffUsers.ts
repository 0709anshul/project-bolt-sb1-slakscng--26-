import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useStaffUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        
        // Get all users from Leumas organization with staff roles
        const { data, error: queryError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            role,
            organization:organizations!inner(name)
          `)
          .eq('organization.name', 'Leumas')
          .in('role', ['admin', 'manager', 'staff'])
          .order('role');

        if (queryError) throw queryError;
        setUsers(data);
      } catch (e) {
        console.error('Error fetching staff users:', e);
        setError(e instanceof Error ? e : new Error('Failed to load staff users'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, isLoading, error };
}