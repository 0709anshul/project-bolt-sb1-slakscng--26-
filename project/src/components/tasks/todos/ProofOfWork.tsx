import React from 'react';
import { FileUpload } from '../../common/FileUpload';
import { SaveButton } from '../../common/SaveButton';
import { useTaskTodoAttachments } from '../../../hooks/useTaskTodoAttachments';
import type { TodoItem } from '../../../types/todos';

type ProofOfWorkProps = {
  todo: TodoItem;
  canManage: boolean;
};

export function ProofOfWork({ todo, canManage }: ProofOfWorkProps) {
  const {
    attachments,
    setAttachments,
    save,
    isLoading,
    error,
    hasChanges
  } = useTaskTodoAttachments(todo);

  if (!canManage && !todo.attachments?.length) {
    return null;
  }

  if (!canManage) {
    return (
      <div className="pl-8 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Proof of Work</h4>
        {todo.attachments?.map((file) => (
          <a
            key={file.path}
            href={file.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            <span className="truncate">{file.name}</span>
            <span className="text-gray-500 text-xs">
              ({Math.round(file.size / 1024)}KB)
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="pl-8 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Proof of Work</h4>
        {hasChanges && (
          <SaveButton 
            onClick={save}
            isLoading={isLoading}
          />
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error.message}
        </div>
      )}

      <FileUpload
        files={attachments}
        onChange={setAttachments}
        disabled={isLoading}
      />
    </div>
  );
}