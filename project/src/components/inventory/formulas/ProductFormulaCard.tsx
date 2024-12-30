import React, { useState } from 'react';
import { Package2, Edit2 } from 'lucide-react';
import { FormulaDetailsModal } from './FormulaDetailsModal';
import { useProductFormulas } from '../../../hooks/inventory/useProductFormulas';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import type { Product } from '../../../types/products';

type ProductFormulaCardProps = {
  product: Product;
};

export function ProductFormulaCard({ product }: ProductFormulaCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { data: formulas, isLoading } = useProductFormulas(product.id);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.organization?.name}</p>
            </div>
          </div>
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Materials</span>
                <span className="font-medium">{formulas?.length || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Batch Size</span>
                <span className="font-medium">{product.batch_size}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {isDetailsOpen && (
        <FormulaDetailsModal
          product={product}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  );
}