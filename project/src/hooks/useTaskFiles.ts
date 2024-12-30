import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { formatAttachmentsForDB, parseAttachmentsFromDB } from '../lib/utils/attachments';
import type { Task } from '../types/orders';
import type { FileUploadResult } from '../lib/storage';

export function useTaskFiles(task: Task) {
  const [files, setFiles] = useState<FileUploadResult[]>(
    parseAttachmentsFromDB(task.attachments)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasChanges = JSON.stringify(files) !== JSON.stringify(task.attachments);

  const save = useCallback(async () => {
    if (!hasChanges) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const formattedAttachments = formatAttachmentsForDB(files);
      
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ 
          attachments: formattedAttachments
        })
        .eq('id', task.id);

      if (updateError) throw updateError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to save files');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [task.id, files, hasChanges]);

  return { files, setFiles, save, hasChanges, isLoading, error };
}