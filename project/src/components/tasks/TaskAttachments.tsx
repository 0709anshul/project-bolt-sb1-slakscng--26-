import React from 'react';
import { FileUpload } from '../common/FileUpload';
import { SaveButton } from '../common/SaveButton';
import { useTaskField } from '../../hooks/useTaskField';
import { formatAttachmentsForDB, parseAttachmentsFromDB } from '../../lib/utils/attachments';
import type { Task } from '../../types/orders';
import type { FileUploadResult } from '../../lib/storage';

type TaskAttachmentsProps = {
  task: Task;
};

export function TaskAttachments({ task }: TaskAttachmentsProps) {
  const {
    value: files,
    setValue: setFiles,
    save,
    isLoading,
    error,
    hasChanges
  } = useTaskField<FileUploadResult[]>(
    task.id,
    'attachments',
    parseAttachmentsFromDB(task.attachments)
  );

  const handleSave = async () => {
    try {
      const formattedAttachments = formatAttachmentsForDB(files);
      await save();
    } catch (err) {
      console.error('Failed to save attachments:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Attachments
        </label>
        {hasChanges && (
          <SaveButton 
            onClick={handleSave}
            isLoading={isLoading}
          />
        )}
      </div>

      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-50 rounded">
          {error.message}
        </div>
      )}

      <FileUpload
        files={files}
        onChange={setFiles}
        disabled={isLoading}
      />
    </div>
  );
}