import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type InventoryStats = {
  totalMaterials: number;
  todayMovements: number;
  pendingOrders: number;
  lowStockItems: number;
};

export function useInventoryStats() {
  const [data, setData] = useState<InventoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get total materials count
        const { count: materialsCount } = await supabase
          .from('materials')
          .select('*', { count: 'exact', head: true });

        // Get today's movements count
        const { count: movementsCount } = await supabase
          .from('inventory_movements')
          .select('*', { count: 'exact', head: true })
          .gte('moved_at', today.toISOString());

        // Get pending orders count
        const { count: ordersCount } = await supabase
          .from('material_orders')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'ordered']);

        // Get low stock items count (placeholder - actual logic would depend on business rules)
        const { count: lowStockCount } = await supabase
          .from('materials')
          .select('*', { count: 'exact', head: true });

        setData({
          totalMaterials: materialsCount || 0,
          todayMovements: movementsCount || 0,
          pendingOrders: ordersCount || 0,
          lowStockItems: lowStockCount || 0
        });
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading inventory stats'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { data, isLoading, error };
}