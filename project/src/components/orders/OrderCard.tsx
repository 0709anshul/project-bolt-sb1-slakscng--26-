import React, { useState } from 'react';
import { Info, ClipboardCheck } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { PriorityToggle } from './PriorityToggle';
import { TasksAccordion } from './TasksAccordion';
import { OrderDetailsModal } from './OrderDetailsModal';
import { ExportButton } from './ExportButton';
import { BatchRecordModal } from './BatchRecordModal';
import { OrderProgressBar } from './OrderProgressBar';
import { SplitIcon } from './split/SplitIcon';
import { SplitOrderModal } from './split/SplitOrderModal';
import { useCanSplitOrder } from '../../hooks/useCanSplitOrder';
import { OrderActions } from './OrderActions';
import { cn } from '../../lib/utils/styles';
import type { ProductionOrder } from '../../types/orders';

type OrderCardProps = {
  order: ProductionOrder;
  onUpdate?: () => void;
  className?: string;
};

export function OrderCard({ order, onUpdate, className }: OrderCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBatchRecordOpen, setIsBatchRecordOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const canSplitOrder = useCanSplitOrder();

  if (!order) return null;

  const lastTaskDueDate = order.tasks?.length > 0 
    ? Math.max(...order.tasks.map(task => new Date(task.due_date).getTime()))
    : null;

  const isSplitOrder = Boolean(order.parent_order_id);

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-6 transition-all duration-200",
      className
    )}>
      {/* Header Row */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">{order.po_number}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              order.order_type === 'Project Plan' 
                ? 'bg-purple-100 text-purple-800'
                : order.order_type === 'NPD Order'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {order.order_type}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            <div className="text-sm text-gray-600">{order.product?.name}</div>
            {order.organization && (
              <div className="text-sm text-gray-500">{order.organization.name}</div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Quantity: {order.quantity}</span>
              <span>•</span>
              <span>Due: {lastTaskDueDate ? formatDate(new Date(lastTaskDueDate)) : 'No tasks'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PriorityToggle orderId={order.id} isPriority={order.is_priority} />
          {!isSplitOrder && (
            <SplitIcon 
              onClick={() => setIsSplitModalOpen(true)}
              isSplit={false}
              disabled={!canSplitOrder}
            />
          )}
          <button 
            onClick={() => setIsBatchRecordOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Batch Record"
          >
            <ClipboardCheck className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setIsDetailsModalOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Info className="h-5 w-5" />
          </button>
          <ExportButton order={order} />
          <OrderActions orderId={order.id} onDelete={onUpdate} />
        </div>
      </div>

      {/* Progress Bar */}
      {order.tasks?.length > 0 && (
        <div className="mt-4">
          <OrderProgressBar tasks={order.tasks} />
        </div>
      )}

      {/* Tasks Section */}
      {order.tasks?.length > 0 && (
        <TasksAccordion tasks={order.tasks} />
      )}

      {/* Modals */}
      {isDetailsModalOpen && (
        <OrderDetailsModal
          order={order}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      {isBatchRecordOpen && (
        <BatchRecordModal
          order={order}
          isOpen={isBatchRecordOpen}
          onClose={() => setIsBatchRecordOpen(false)}
        />
      )}

      {isSplitModalOpen && canSplitOrder && (
        <SplitOrderModal
          order={order}
          isOpen={isSplitModalOpen}
          onClose={() => setIsSplitModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}