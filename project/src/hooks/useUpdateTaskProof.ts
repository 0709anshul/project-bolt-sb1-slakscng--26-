import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { FileUploadResult } from '../lib/storage';

type ProofData = {
  proof: string;
  attachments: FileUploadResult[];
};

export function useUpdateTaskProof() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProof = async (taskId: string, data: ProofData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure we have valid data
      const proof = data.proof || '';
      const attachments = Array.isArray(data.attachments) ? data.attachments : [];

      // Format attachments as a JSONB array for Postgres
      const formattedAttachments = JSON.stringify(
        attachments.map(attachment => ({
          path: attachment.path,
          name: attachment.name,
          type: attachment.type,
          size: Number(attachment.size)
        }))
      );

      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          proof_of_work: proof,
          attachments: formattedAttachments
        })
        .eq('id', taskId);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update proof of work');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProof, isLoading, error };
}