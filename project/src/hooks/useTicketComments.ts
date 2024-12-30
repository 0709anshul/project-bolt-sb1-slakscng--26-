import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TicketComment } from '../types/tickets';

export function useTicketComments(ticketId: string) {
  const [comments, setComments] = useState<TicketComment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const { data, error: commentsError } = await supabase
        .from('ticket_comments')
        .select(`
          *,
          user:users(id, full_name, email)
        `)
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      setComments(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Error loading comments'));
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string, attachments: any[] = []) => {
    try {
      const { error: commentError } = await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticketId,
          content,
          attachments,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (commentError) throw commentError;
      await fetchComments();
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to add comment');
    }
  };

  return { comments, isLoading, error, addComment, refresh: fetchComments };
}