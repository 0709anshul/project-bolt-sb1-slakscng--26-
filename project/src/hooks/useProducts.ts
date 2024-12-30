import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { Product } from '../types/products';

export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchProducts() {
      if (!user) return;

      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            organization:organizations(
              id,
              name
            )
          `)
          .order('name');

        // Filter by organization for brand users
        if (user.role === 'brand_user') {
          query = query.eq('organization_id', user.organization_id);
        }

        const { data, error } = await query;
        if (error) throw error;
        setData(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [user]);

  return { data, isLoading, error };
}