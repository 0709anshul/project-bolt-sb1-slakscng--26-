import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { formatAttachmentsForDB } from '../lib/utils/attachments';
import type { Task } from '../types/orders';
import type { FileUploadResult } from '../lib/storage';

type UpdateData = {
  internal_notes?: string;
  attachments?: FileUploadResult[];
};

export function useTaskUpdate(task: Task) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (data: UpdateData) => {
    setIsLoading(true);
    setError(null);

    try {
      const updateData: Record<string, any> = {};

      // Handle internal notes
      if (data.internal_notes !== undefined) {
        updateData.internal_notes = data.internal_notes;
      }

      // Handle attachments
      if (data.attachments !== undefined) {
        updateData.attachments = formatAttachmentsForDB(data.attachments);
      }

      const { error: updateError } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', task.id)
        .select()
        .single();

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update task');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}