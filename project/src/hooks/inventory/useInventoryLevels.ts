import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { MaterialInventory } from '../../types/inventory';

export function useInventoryLevels() {
  const [data, setData] = useState<MaterialInventory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInventory() {
      try {
        // Get all materials first
        const { data: materials, error: materialsError } = await supabase
          .from('materials')
          .select('*');

        if (materialsError) throw materialsError;

        // Get inventory levels for each material
        const inventoryLevels = await Promise.all(
          materials.map(async (material) => {
            const { data: inward } = await supabase.rpc(
              'get_current_inventory',
              { p_material_id: material.id, p_section: 'inward' }
            );

            const { data: brand } = await supabase.rpc(
              'get_current_inventory',
              { p_material_id: material.id, p_section: 'brand' }
            );

            const { data: production } = await supabase.rpc(
              'get_current_inventory',
              { p_material_id: material.id, p_section: 'production' }
            );

            return {
              material_id: material.id,
              material: material,
              inward: inward || 0,
              brand: brand || 0,
              production: production || 0,
              total: (inward || 0) + (brand || 0) + (production || 0)
            };
          })
        );

        setData(inventoryLevels);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading inventory'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchInventory();
  }, []);

  return { data, isLoading, error };
}