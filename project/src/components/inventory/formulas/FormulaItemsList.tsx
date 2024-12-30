import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteFormulaItem } from '../../../hooks/inventory/useDeleteFormulaItem';
import { UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { ProductFormula } from '../../../types/inventory';

type FormulaItemsListProps = {
  formulas: ProductFormula[];
};

export function FormulaItemsList({ formulas }: FormulaItemsListProps) {
  const { deleteItem, isLoading: isDeleting } = useDeleteFormulaItem();

  if (!formulas.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No materials added to formula yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {formulas.map((formula) => (
        <div 
          key={formula.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h4 className="font-medium">{formula.material?.name}</h4>
            <p className="text-sm text-gray-500">
              {formula.quantity} {UNITS_OF_MEASUREMENT[formula.material?.unit_of_measurement || 'unit']}
            </p>
          </div>
          <button
            onClick={() => deleteItem(formula.id)}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}