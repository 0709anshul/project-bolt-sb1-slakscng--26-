import React from 'react';
import { getStatusStyles, formatStatus } from '../../lib/utils/status';
import type { TaskStatus as TaskStatusType } from '../../types/orders';

type TaskStatusProps = {
  status: TaskStatusType | undefined;
};

export function TaskStatus({ status }: TaskStatusProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(status)}`}>
      {formatStatus(status)}
    </span>
  );
}