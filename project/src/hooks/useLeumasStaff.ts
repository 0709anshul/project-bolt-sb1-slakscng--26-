import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useLeumasStaff() {
  const [staff, setStaff] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        setIsLoading(true);
        
        // First get Leumas organization ID
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id')
          .eq('name', 'Leumas')
          .single();

        if (orgError) throw orgError;
        if (!orgData?.id) throw new Error('Leumas organization not found');

        // Then get all staff users
        const { data: staffData, error: staffError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            role
          `)
          .eq('organization_id', orgData.id)
          .in('role', ['admin', 'manager', 'staff'])
          .order('role');

        if (staffError) throw staffError;
        setStaff(staffData);
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