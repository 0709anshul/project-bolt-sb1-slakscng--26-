import { supabase } from '../supabase';
import { ALLOWED_FILE_TYPES } from './constants';
import { validateFile } from './validation';
import type { FileUploadResult, FileType } from './types';

export async function uploadFile(
  file: File,
  bucket: string = 'order-attachments'
): Promise<FileUploadResult> {
  // Validate file
  validateFile(file);

  // Generate unique file path
  const fileExt = ALLOWED_FILE_TYPES[file.type as FileType];
  const filePath = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: publicUrl,
    name: file.name,
    type: file.type as FileType,
    size: file.size
  };
}