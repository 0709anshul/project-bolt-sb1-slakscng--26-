import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TicketStatus } from '../types/tickets';

export function useUpdateTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateStatus = async (ticketId: string, status: TicketStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update ticket status');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAssignment = async (ticketId: string, assignedTo: string | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ 
          assigned_to: assignedTo,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update ticket assignment');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, updateAssignment, isLoading, error };
}