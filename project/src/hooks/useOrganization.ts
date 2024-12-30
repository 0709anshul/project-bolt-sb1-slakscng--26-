import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Organization } from '../types/organizations';

export function useOrganization(organizationId: string | undefined) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!organizationId) {
      setOrganization(null);
      setIsLoading(false);
      return;
    }

    let mounted = true;

    async function loadOrganization() {
      try {
        setIsLoading(true);
        const { data, error: queryError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', organizationId)
          .single();

        if (queryError) throw queryError;
        if (mounted) {
          setOrganization(data);
        }
      } catch (err) {
        console.error('Failed to load organization:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load organization'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrganization();
    return () => { mounted = false; };
  }, [organizationId]);

  return { organization, isLoading, error };
}