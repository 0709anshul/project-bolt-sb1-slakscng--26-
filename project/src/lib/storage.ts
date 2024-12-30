import { supabase } from './supabase';

const ALLOWED_FILE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov'
};

export type FileUploadResult = {
  path: string;
  name: string;
  type: string;
  size: number;
};

export async function uploadFile(
  file: File,
  bucket: string = 'task-attachments'
): Promise<FileUploadResult> {
  if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
    throw new Error('File type not supported');
  }

  const fileExt = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES];
  const filePath = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: publicUrl,
    name: file.name,
    type: file.type,
    size: file.size
  };
}

export async function deleteFile(
  path: string,
  bucket: string = 'task-attachments'
): Promise<void> {
  // Extract filename from full URL
  const filename = path.split('/').pop();
  if (!filename) {
    throw new Error('Invalid file path');
  }

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filename]);

  if (error) {
    throw error;
  }
}