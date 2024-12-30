import { useState, useEffect } from 'react';
import { useOrders } from './useOrders';
import { useTasks } from './useTasks';
import { useProducts } from './useProducts';

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { data: tasks, isLoading: loadingTasks } = useTasks();
  const { data: products, isLoading: loadingProducts } = useProducts();

  useEffect(() => {
    const dataLoaded = orders !== null && tasks !== null && products !== null;
    const loadingComplete = !loadingOrders && !loadingTasks && !loadingProducts;

    if (dataLoaded && loadingComplete) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [orders, tasks, products, loadingOrders, loadingTasks, loadingProducts]);

  return isLoading;
}