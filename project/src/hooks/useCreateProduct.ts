import { useState } from 'react';
import { createProduct } from '../lib/products';
import type { CreateProductData } from '../types/products';

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateProductData) => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await createProduct(data);
      return product;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to create product'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}