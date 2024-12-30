import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Material } from '../../types/inventory';

type CreateMaterialData = Omit<Material, 'id' | 'created_at' | 'updated_at'>;

export function useCreateMaterial() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMaterial = async (data: CreateMaterialData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: createError } = await supabase
        .from('materials')
        .insert(data);

      if (createError) throw createError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create material');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createMaterial, isLoading, error };
}