import React from 'react';
import { AlertCircle, Clock, CheckCircle, User2 } from 'lucide-react';
import { formatDate } from '../../utils/date';
import type { Ticket } from '../../types/tickets';

type TicketCardProps = {
  ticket: Ticket;
  onClick?: () => void;
};

const PRIORITY_STYLES = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const STATUS_STYLES = {
  open: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', icon: AlertCircle },
  resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
};

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const statusStyle = STATUS_STYLES[ticket.status];
  const StatusIcon = statusStyle.icon;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium">{ticket.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${PRIORITY_STYLES[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            <p className="text-sm text-gray-500">
              Category: {ticket.category}
            </p>
            <p className="text-sm text-gray-500">
              Created {formatDate(ticket.created_at)}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
          <StatusIcon className="h-3 w-3" />
          {ticket.status}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{ticket.description}</p>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4" />
          <span>{ticket.created_by.full_name}</span>
        </div>
        {ticket.assigned_to && (
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>Assigned to {ticket.assigned_to.full_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}