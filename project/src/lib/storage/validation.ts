import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './constants';
import type { FileType } from './types';

export function validateFile(file: File): void {
  if (!ALLOWED_FILE_TYPES[file.type as FileType]) {
    throw new Error(
      `File type not supported. Allowed types: ${Object.keys(ALLOWED_FILE_TYPES).join(', ')}`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
}