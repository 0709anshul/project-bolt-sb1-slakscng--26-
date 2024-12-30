import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCurrentUser } from './useCurrentUser';
import type { Ticket } from '../types/tickets';

export function useTickets() {
  const [data, setData] = useState<Ticket[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    async function fetchTickets() {
      if (!user) return;

      try {
        let query = supabase
          .from('tickets')
          .select(`
            *,
            created_by:users!tickets_created_by_fkey(
              id,
              full_name,
              email
            ),
            assigned_to:users!tickets_assigned_to_fkey(
              id,
              full_name,
              email
            ),
            organization:organizations(
              id,
              name
            )
          `)
          .order('created_at', { ascending: false });

        // Filter by organization for brand users
        if (user.role === 'brand_user') {
          query = query.eq('organization_id', user.organization_id);
        }

        const { data: tickets, error: ticketsError } = await query;
        if (ticketsError) throw ticketsError;
        setData(tickets);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading tickets'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchTickets();
  }, [user]);

  return { data, isLoading, error };
}