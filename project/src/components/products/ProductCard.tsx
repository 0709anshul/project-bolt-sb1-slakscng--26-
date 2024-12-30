import React from 'react';
import { Building2 } from 'lucide-react';
import { ProductActions } from './ProductActions';
import type { Product } from '../../types/products';

type ProductCardProps = {
  product: Product;
  onUpdate?: () => void;
};

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <h3 className="font-medium truncate">{product.name}</h3>
          <div className="mt-1 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 className="h-4 w-4" />
              <span>{product.organization?.name}</span>
            </div>
            <p className="text-sm text-gray-500">Batch size: {product.batch_size}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-indigo-600 font-medium whitespace-nowrap ml-4">₹{product.price_inr}</p>
          <ProductActions productId={product.id} onDelete={onUpdate} />
        </div>
      </div>
    </div>
  );
}