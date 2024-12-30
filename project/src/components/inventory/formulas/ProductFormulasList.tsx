import React from 'react';
import { ClipboardList } from 'lucide-react';
import { ProductFormulaCard } from './ProductFormulaCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import type { Product } from '../../../types/products';

type ProductFormulasListProps = {
  products: Product[];
};

export function ProductFormulasList({ products }: ProductFormulasListProps) {
  if (!products?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductFormulaCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
      <p className="mt-1 text-sm text-gray-500">Add products to create formulas.</p>
    </div>
  );
}