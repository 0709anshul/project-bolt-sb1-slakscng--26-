import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useLeumas() {
  const [staff, setStaff] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        setIsLoading(true);
        
        const { data, error: queryError } = await supabase
          .from('users')
          .select('id, full_name, role')
          .eq('organization_id', '4321b7c9-7d2e-4821-9c3d-b730f84d0576') // Leumas org ID
          .in('role', ['admin', 'manager', 'staff'])
          .order('role');

        if (queryError) throw queryError;
        setStaff(data);
      } catch (e) {
        console.error('Error fetching staff:', e);
        setError(e instanceof Error ? e : new Error('Failed to load staff'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStaff();
  }, []);

  return { staff, isLoading, error };
}