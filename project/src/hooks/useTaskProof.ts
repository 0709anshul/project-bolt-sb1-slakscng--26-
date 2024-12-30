import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { formatAttachmentsForDB, parseAttachmentsFromDB } from '../lib/utils/attachments';
import type { Task } from '../types/orders';
import type { FileUploadResult } from '../lib/storage';

export function useTaskProof(task: Task) {
  const [proof, setProof] = useState(task.proof_of_work || '');
  const [attachments, setAttachments] = useState<FileUploadResult[]>(
    parseAttachmentsFromDB(task.attachments)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = 
    proof !== task.proof_of_work || 
    JSON.stringify(attachments) !== JSON.stringify(task.attachments);

  const updateProof = useCallback(async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const formattedAttachments = formatAttachmentsForDB(attachments);
      
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          proof_of_work: proof || '',
          attachments: formattedAttachments
        })
        .eq('id', task.id);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update proof of work');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [task.id, proof, attachments, hasChanges]);

  return {
    proof,
    setProof,
    attachments,
    setAttachments,
    updateProof,
    hasChanges,
    isLoading,
    error
  };
}