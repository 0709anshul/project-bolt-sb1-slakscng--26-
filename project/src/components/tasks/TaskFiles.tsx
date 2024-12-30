import React from 'react';
import { FileUpload } from '../common/FileUpload';
import { SaveButton } from '../common/SaveButton';
import { useTaskFiles } from '../../hooks/useTaskFiles';
import type { Task } from '../../types/orders';

type TaskFilesProps = {
  task: Task;
};

export function TaskFiles({ task }: TaskFilesProps) {
  const { files, setFiles, save, hasChanges, isLoading, error } = useTaskFiles(task);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Attachments
        </label>
        {hasChanges && (
          <SaveButton 
            onClick={save}
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