import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import type { TicketStatus } from '../../types/tickets';

type TicketStatusBadgeProps = {
  status: TicketStatus;
};

const STATUS_STYLES = {
  open: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', icon: AlertCircle },
  resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle }
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const style = STATUS_STYLES[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${style.bg} ${style.text}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}