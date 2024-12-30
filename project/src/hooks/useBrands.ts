import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Organization } from '../types/organizations';

export function useBrands() {
  const [data, setData] = useState<Organization[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('type', 'Customer Brand')
          .order('name');

        if (error) throw error;
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading brands'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  return { data, isLoading, error };
}