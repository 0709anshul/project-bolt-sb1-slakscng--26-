import { useState, useEffect } from 'react';
import { useOrders } from './useOrders';
import { useTasks } from './useTasks';
import { useProducts } from './useProducts';

export function useInitialLoad() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { data: tasks, isLoading: loadingTasks } = useTasks();
  const { data: products, isLoading: loadingProducts } = useProducts();

  useEffect(() => {
    // Consider loading complete when all data is loaded (not just loading states)
    const allLoaded = 
      !loadingOrders && orders !== null &&
      !loadingTasks && tasks !== null &&
      !loadingProducts && products !== null;

    if (allLoaded) {
      // Add small delay for smooth transition
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [loadingOrders, loadingTasks, loadingProducts, orders, tasks, products]);

  return isLoading;
}