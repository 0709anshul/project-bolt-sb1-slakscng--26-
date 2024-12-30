import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { StoreSection } from '../../types/inventory';

type CreateMovementData = {
  material_id: string;
  quantity: number;
  from_section: StoreSection | '';
  to_section: StoreSection;
  notes?: string;
};

export function useCreateMovement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMovement = async (data: CreateMovementData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: createError } = await supabase
        .from('inventory_movements')
        .insert({
          material_id: data.material_id,
          quantity: data.quantity,
          from_section: data.from_section || null,
          to_section: data.to_section,
          notes: data.notes,
          moved_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (createError) throw createError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create movement');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createMovement, isLoading, error };
}