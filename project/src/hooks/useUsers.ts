import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useUsers() {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: users, error: queryError } = await supabase
        .from('users')
        .select(`
          id,
          email,
          full_name,
          role,
          organization:organizations(
            id,
            name
          )
        `)
        .order('role')
        .order('full_name');

      if (queryError) throw queryError;
      setData(users);
    } catch (e) {
      console.error('Failed to load users:', e);
      setError(e instanceof Error ? e : new Error('Failed to load users'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, isLoading, error, refetch: fetchUsers };
}