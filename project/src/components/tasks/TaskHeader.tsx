import React from 'react';
import type { Task } from '../../types/orders';

type TaskHeaderProps = {
  task: Task;
};

export function TaskHeader({ task }: TaskHeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{task.details}</h2>
      {task.production_order && (
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <span>PO: {task.production_order.po_number}</span>
          {task.production_order.organization && (
            <>
              <span>•</span>
              <span>{task.production_order.organization.name}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}