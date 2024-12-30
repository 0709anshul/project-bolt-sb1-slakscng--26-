import React from 'react';
import { getStatusStyles, formatStatus } from '../../../lib/utils/status';
import type { TaskStatus as TaskStatusType } from '../../../types/orders';

const STATUS_OPTIONS: TaskStatusType[] = [
  'pending',
  'pending_from_client',
  'in_progress',
  'completed'
];

type TaskStatusSelectProps = {
  status: TaskStatusType;
  onChange?: (status: TaskStatusType) => void;
  disabled?: boolean;
  readOnly?: boolean;
};

export function TaskStatusSelect({ 
  status, 
  onChange,
  disabled,
  readOnly 
}: TaskStatusSelectProps) {
  if (readOnly) {
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(status)}`}>
        {formatStatus(status)}
      </span>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChange?.(e.target.value as TaskStatusType)}
      disabled={disabled}
      className={`
        w-full px-3 py-2 rounded-lg text-sm border
        ${getStatusStyles(status)}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      `}
    >
      {STATUS_OPTIONS.map(option => (
        <option key={option} value={option}>
          {formatStatus(option)}
        </option>
      ))}
    </select>
  );
}