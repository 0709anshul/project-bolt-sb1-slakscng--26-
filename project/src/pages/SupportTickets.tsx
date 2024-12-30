import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { AddTicketModal } from '../components/tickets/AddTicketModal';
import { TicketCard } from '../components/tickets/TicketCard';
import { TicketDetailsModal } from '../components/tickets/TicketDetailsModal';
import { TicketFilters } from '../components/tickets/TicketFilters';
import { useTickets } from '../hooks/useTickets';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import type { Ticket, TicketStatus } from '../types/tickets';

export default function SupportTickets() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { data: tickets, isLoading, error, refetch } = useTickets();
  const [filters, setFilters] = useState({
    organization: '',
    status: '' as TicketStatus | '',
    dateFrom: '',
    dateTo: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredTickets = tickets?.filter(ticket => {
    if (filters.organization && ticket.organization_id !== filters.organization) {
      return false;
    }

    if (filters.status && ticket.status !== filters.status) {
      return false;
    }

    const ticketDate = new Date(ticket.created_at);
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      if (ticketDate < fromDate) return false;
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59);
      if (ticketDate > toDate) return false;
    }

    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Service Requests</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Raise Request
          </button>
        </div>

        <TicketFilters 
          filters={filters}
          onChange={handleFilterChange}
        />

        {error && <ErrorMessage message={error.message} />}
        {isLoading && <LoadingSpinner />}
        
        {filteredTickets && (
          <div className="grid grid-cols-1 gap-6">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No service requests found matching your filters
              </div>
            )}
          </div>
        )}

        {isAddModalOpen && (
          <AddTicketModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={refetch}
          />
        )}

        {selectedTicket && (
          <TicketDetailsModal
            ticket={selectedTicket}
            isOpen={true}
            onClose={() => setSelectedTicket(null)}
            onUpdate={refetch}
          />
        )}
      </div>
    </DashboardLayout>
  );
}