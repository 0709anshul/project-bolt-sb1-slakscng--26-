import { useState } from 'react';
import { createBrand } from '../lib/brands';
import type { CreateBrandData } from '../types/organizations';

export function useCreateBrand() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateBrandData) => {
    setIsLoading(true);
    setError(null);
    try {
      const brand = await createBrand(data);
      return brand;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to create brand'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}