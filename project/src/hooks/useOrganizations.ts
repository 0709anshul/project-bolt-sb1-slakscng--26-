import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { Organization } from '../types/organizations';

export function useOrganizations() {
  const [data, setData] = useState<Organization[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchOrganizations() {
      if (!user) return;

      try {
        let query = supabase
          .from('organizations')
          .select('*')
          .order('name');

        // For brand users, only show their organization
        if (user.role === 'brand_user') {
          query = query.eq('id', user.organization_id);
        }

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading organizations'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrganizations();
  }, [user]);

  return { data, isLoading, error };
}