import { supabase } from '../supabase';

export async function deleteFile(
  path: string,
  bucket: string = 'order-attachments'
): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw error;
  }
}