import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useTaskOwners() {
  const [owners, setOwners] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOwners() {
      try {
        setIsLoading(true);
        
        // Get all Leumas staff (admin, manager, staff)
        const { data, error: queryError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            email,
            role,
            organization:organizations (
              id,
              name
            )
          `)
          .eq('organization.name', 'Leumas')
          .in('role', ['admin', 'manager', 'staff'])
          .order('role');

        if (queryError) throw queryError;
        setOwners(data);
      } catch (e) {
        console.error('Error fetching owners:', e);
        setError(e instanceof Error ? e : new Error('Failed to load available owners'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchOwners();
  }, []);

  return { owners, isLoading, error };
}