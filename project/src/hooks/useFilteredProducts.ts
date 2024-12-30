import { useMemo } from 'react';
import { useProducts } from './useProducts';

export function useFilteredProducts(selectedBrand: string) {
  const { data: products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return null;
    if (!selectedBrand) return products;

    return products.filter(product => 
      product.organization?.name === selectedBrand
    );
  }, [products, selectedBrand]);

  return { products: filteredProducts, isLoading, error };
}