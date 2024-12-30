import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Material } from '../../types/inventory';

export function useMaterials() {
  const [data, setData] = useState<Material[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const { data: materials, error: queryError } = await supabase
          .from('materials')
          .select('*')
          .order('name');

        if (queryError) throw queryError;
        setData(materials);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading materials'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchMaterials();
  }, []);

  return { data, isLoading, error };
}