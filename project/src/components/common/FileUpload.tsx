import React from 'react';
import { PaperclipIcon, Trash2 } from 'lucide-react';
import { uploadFile, deleteFile } from '../../lib/storage';
import type { FileUploadResult } from '../../lib/storage';

type FileUploadProps = {
  files: FileUploadResult[];
  onChange: (files: FileUploadResult[]) => void;
  disabled?: boolean;
};

export function FileUpload({ files, onChange, disabled }: FileUploadProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    try {
      const newFiles = await Promise.all(
        Array.from(selectedFiles).map(file => uploadFile(file))
      );
      onChange([...files, ...newFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleRemoveFile = async (index: number) => {
    try {
      await deleteFile(files[index].path);
      onChange(files.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing file:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div 
              key={file.path} 
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-2">
                <a 
                  href={file.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {file.name}
                </a>
                <span className="text-xs text-gray-500">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                disabled={disabled}
                className="text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="block">
        <span className="sr-only">Choose files</span>
        <div className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 cursor-pointer">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={disabled}
              accept=".jpg,.jpeg,.png,.gif,.pdf,.mp4,.mov"
              className="sr-only"
            />
            <PaperclipIcon className="h-4 w-4 text-gray-400" />
            <span>Attach files</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500 text-center">
          Images, PDFs, and videos up to 50MB
        </p>
      </label>
    </div>
  );
}