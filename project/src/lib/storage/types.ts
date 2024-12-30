export type FileType = 
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'application/pdf'
  | 'video/mp4'
  | 'video/quicktime';

export type FileUploadResult = {
  path: string;
  name: string;
  type: FileType;
  size: number;
};