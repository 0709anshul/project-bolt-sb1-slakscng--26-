import { useState } from 'react';
import { updateBrand } from '../lib/brands';
import type { UpdateBrandData } from '../types/organizations';

export function useUpdateBrand() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, data: UpdateBrandData) => {
    setIsLoading(true);
    setError(null);
    try {
      const brand = await updateBrand(id, data);
      return brand;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update brand'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}