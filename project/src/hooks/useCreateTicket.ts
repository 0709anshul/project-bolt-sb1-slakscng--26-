import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { CreateTicketData } from '../types/tickets';

export function useCreateTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateTicketData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      const { error: ticketError } = await supabase
        .from('tickets')
        .insert({
          ...data,
          created_by: user.id,
          organization_id: userData.organization_id,
          status: 'open'
        });

      if (ticketError) throw ticketError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create ticket');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}