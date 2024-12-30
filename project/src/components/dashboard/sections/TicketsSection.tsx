import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTickets } from '../../../hooks/useTickets';
import { LimitedList } from '../../common/LimitedList';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { TicketCard } from '../../tickets/TicketCard';
import { SectionHeader } from './SectionHeader';
import { AddTicketModal } from '../../tickets/AddTicketModal';

export function TicketsSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: tickets, isLoading, error } = useTickets();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-6">
      <SectionHeader 
        title="Support Tickets"
        actionIcon={Plus}
        actionLabel="Raise Ticket"
        onAction={() => setIsAddModalOpen(true)}
      />

      <LimitedList
        items={tickets}
        renderItem={(ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        )}
        emptyMessage="No support tickets found"
        limit={8}
      />

      {isAddModalOpen && (
        <AddTicketModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}