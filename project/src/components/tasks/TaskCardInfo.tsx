import React from 'react';
import { Package2, Hash } from 'lucide-react';
import type { Task } from '../../types/orders';

type TaskCardInfoProps = {
  task: Task;
};

export function TaskCardInfo({ task }: TaskCardInfoProps) {
  if (!task.production_order) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>PO: {task.production_order.po_number}</span>
        {task.production_order.organization && (
          <>
            <span>•</span>
            <span>{task.production_order.organization.name}</span>
          </>
        )}
      </div>
      {task.production_order.product && (
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Package2 className="h-4 w-4" />
            <span>{task.production_order.product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <span>Qty: {task.production_order.quantity}</span>
          </div>
        </div>
      )}
    </div>
  );
}