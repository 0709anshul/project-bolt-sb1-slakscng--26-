import React, { useState } from 'react';
import { X } from 'lucide-react';
import { RichTextEditor } from '../common/RichTextEditor';
import { useBatchRecord } from '../../hooks/useBatchRecord';
import { SaveButton } from '../common/SaveButton';
import { useUserRole } from '../../hooks/useUserRole';
import { exportBatchRecord } from '../../lib/pdf/batchRecordExport';
import type { ProductionOrder } from '../../types/orders';

type BatchRecordModalProps = {
  order: ProductionOrder;
  isOpen: boolean;
  onClose: () => void;
};

export function BatchRecordModal({ order, isOpen, onClose }: BatchRecordModalProps) {
  const { data: batchRecord, isLoading, error, updateBatchRecord } = useBatchRecord(order.id);
  const [details, setDetails] = useState(batchRecord?.details || '');
  const { isAdmin, isManager } = useUserRole();
  const canEdit = isAdmin || isManager;

  // Update local state when batch record data changes
  React.useEffect(() => {
    if (batchRecord?.details) {
      setDetails(batchRecord.details);
    }
  }, [batchRecord]);

  const handleSave = async () => {
    try {
      await updateBatchRecord(details);
    } catch (err) {
      console.error('Error saving batch record:', err);
    }
  };

  const handleExport = () => {
    if (details) {
      exportBatchRecord(order, details);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Batch Record</h2>
            <p className="text-sm text-gray-500">PO: {order.po_number}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={!details}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Export PDF
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Batch Record Details
            </label>
            {canEdit && details !== batchRecord?.details && (
              <SaveButton 
                onClick={handleSave}
                isLoading={isLoading}
              />
            )}
          </div>

          <RichTextEditor
            content={details}
            onChange={setDetails}
            disabled={!canEdit || isLoading}
          />
        </div>
      </div>
    </div>
  );
}