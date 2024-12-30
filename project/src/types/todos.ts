import type { FileUploadResult } from '../lib/storage';

export type TodoItem = {
  id: string;
  task_id: string;
  description: string;
  notes: string | null;
  completed: boolean;
  attachments: FileUploadResult[];
  is_private: boolean;
  created_at: string;
};