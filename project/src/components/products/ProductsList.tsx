import React from 'react';
import { Package2 } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import type { Product } from '../../types/products';

type ProductsListProps = {
  products: Product[] | null;
  isLoading: boolean;
  error: Error | null;
};

export function ProductsList({ products, isLoading, error }: ProductsListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!products?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <Package2 className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
    </div>
  );
}