import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useCreateFormulaItem } from '../../../hooks/inventory/useCreateFormulaItem';
import { useMaterials } from '../../../hooks/inventory/useMaterials';
import { useProductFormulas } from '../../../hooks/inventory/useProductFormulas';
import { FormulaItemsList } from './FormulaItemsList';
import { AddFormulaItemModal } from './AddFormulaItemModal';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import type { Product } from '../../../types/products';

type FormulaDetailsModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function FormulaDetailsModal({ product, isOpen, onClose, onSuccess }: FormulaDetailsModalProps) {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const { data: formulas, isLoading, error } = useProductFormulas(product.id);
  const { data: materials } = useMaterials();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
        {/* Fixed Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">Batch Size: {product.batch_size}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto">
          {error && <ErrorMessage message={error.message} />}

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Formula Components</h3>
              <button
                onClick={() => setIsAddItemOpen(true)}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Material
              </button>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <FormulaItemsList formulas={formulas || []} />
            )}
          </div>
        </div>
      </div>

      {isAddItemOpen && materials && (
        <AddFormulaItemModal
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          productId={product.id}
          materials={materials.filter(m => 
            !formulas?.some(f => f.material_id === m.id)
          )}
        />
      )}
    </div>
  );
}