import { useState, useEffect } from 'react';
import { getProductFormula, getMaterialInventory } from '../../lib/api/inventory/requirements';
import { calculateRequiredQuantity, calculateShortage } from '../../lib/utils/inventory/calculations';
import type { MaterialRequirement } from '../../types/inventory/indent';
import type { ProductionOrder } from '../../types/orders';

export function useMaterialRequirements(order: ProductionOrder | null | undefined) {
  const [data, setData] = useState<MaterialRequirement[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRequirements() {
      // Reset state if no order or missing required data
      if (!order?.product?.id || !order?.quantity) {
        setData(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get formula components
        const formula = await getProductFormula(order.product.id);
        
        if (!formula?.length) {
          setData([]);
          return;
        }

        // Calculate requirements for each material
        const requirements = await Promise.all(
          formula.map(async (item) => {
            if (!item.material || typeof item.quantity !== 'number') {
              throw new Error(`Invalid formula data for ${order.product?.name}`);
            }

            const inventory = await getMaterialInventory(item.material.id);
            const available = inventory.inward + inventory.brand;
            const required = calculateRequiredQuantity(item.quantity, order.quantity);
            
            return {
              material: item.material,
              required_quantity: required,
              available_quantity: available,
              shortage_quantity: calculateShortage(required, available)
            };
          })
        );

        setData(requirements);
      } catch (e) {
        console.error('Error loading material requirements:', e);
        setError(e instanceof Error ? e : new Error('Error loading material requirements'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRequirements();
  }, [order?.product?.id, order?.quantity]);

  return { data, isLoading, error };
}