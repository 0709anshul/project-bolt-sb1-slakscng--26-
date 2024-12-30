import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ProductionOrder } from '../../types/orders';

type SplitOrderModalProps = {
  order: ProductionOrder;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function SplitOrderModal({ order, isOpen, onClose, onSuccess }: SplitOrderModalProps) {
  const [quantities, setQuantities] = useState<number[]>([0]);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalNewQuantity = quantities.reduce((sum, q) => sum + q, 0);
  const isValidSplit = totalNewQuantity > 0 && totalNewQuantity < order.quantity;

  const addQuantityField = () => {
    setQuantities([...quantities, 0]);
  };

  const removeQuantityField = (index: number) => {
    setQuantities(quantities.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, value: number) => {
    setQuantities(quantities.map((q, i) => i === index ? value : q));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSplit) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: splitError } = await supabase.rpc(
        'split_production_order',
        {
          order_id: order.id,
          new_quantities: quantities,
          split_reason: reason
        }
      );

      if (splitError) throw splitError;
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error splitting order:', err);
      setError(err instanceof Error ? err.message : 'Failed to split order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Split Order {order.po_number}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Split Quantities
              </label>
              <button
                type="button"
                onClick={addQuantityField}
                className="text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              {quantities.map((quantity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={order.quantity - 1}
                    value={quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isLoading}
                  />
                  {quantities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuantityField(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Original quantity: {order.quantity}
              <br />
              Remaining quantity: {order.quantity - totalNewQuantity}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Split Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValidSplit || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Splitting...' : 'Split Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}