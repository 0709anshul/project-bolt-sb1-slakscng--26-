import type { FileUploadResult } from '../storage';

export function formatAttachmentsForDB(attachments: FileUploadResult[]) {
  // Ensure we have a valid array
  if (!Array.isArray(attachments)) {
    return [];
  }

  // Format each attachment for Postgres JSONB
  return attachments
    .filter(attachment => attachment && typeof attachment === 'object')
    .map(attachment => ({
      path: String(attachment.path || ''),
      name: String(attachment.name || ''),
      type: String(attachment.type || ''),
      size: Number(attachment.size || 0)
    }));
}

export function parseAttachmentsFromDB(attachments: unknown): FileUploadResult[] {
  try {
    // Handle various input formats
    let parsedAttachments: any[];
    
    if (typeof attachments === 'string') {
      // Parse string input
      parsedAttachments = JSON.parse(attachments);
    } else if (Array.isArray(attachments)) {
      // Use array directly
      parsedAttachments = attachments;
    } else {
      // Default to empty array for invalid input
      return [];
    }

    // Validate and format each attachment
    return parsedAttachments
      .filter(attachment => attachment && typeof attachment === 'object')
      .map(attachment => ({
        path: String(attachment.path || ''),
        name: String(attachment.name || ''),
        type: String(attachment.type || ''),
        size: Number(attachment.size || 0)
      }));
  } catch (error) {
    console.error('Error parsing attachments:', error);
    return [];
  }
}