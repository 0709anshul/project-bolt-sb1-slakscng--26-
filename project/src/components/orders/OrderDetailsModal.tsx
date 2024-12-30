import React, { useState } from 'react';
import { X } from 'lucide-react';
import { RichTextEditor } from '../common/RichTextEditor';
import { useUpdateOrder } from '../../hooks/useUpdateOrder';
import { FileUpload } from '../common/FileUpload';
import type { ProductionOrder } from '../../types/orders';

type OrderDetailsModalProps = {
  order: ProductionOrder;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function OrderDetailsModal({ order, isOpen, onClose, onUpdate }: OrderDetailsModalProps) {
  const [details, setDetails] = useState(order.details || '');
  const [attachments, setAttachments] = useState(order.attachments || []);
  const { updateOrder, isLoading, error } = useUpdateOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOrder(order.id, { details, attachments });
      onUpdate?.();
      onClose();
    } catch (err) {
      // Error handling is managed by useUpdateOrder
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <RichTextEditor
              content={details}
              onChange={setDetails}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <FileUpload
              files={attachments}
              onChange={setAttachments}
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
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}