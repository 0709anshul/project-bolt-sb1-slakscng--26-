import React from 'react';
import { RichTextEditor } from '../common/RichTextEditor';
import { SaveButton } from '../common/SaveButton';
import { useTaskText } from '../../hooks/useTaskText';
import type { Task } from '../../types/orders';

type TaskTextProps = {
  task: Task;
};

export function TaskText({ task }: TaskTextProps) {
  const { text, setText, save, hasChanges, isLoading, error } = useTaskText(task);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Description
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

      <RichTextEditor
        content={text}
        onChange={setText}
        disabled={isLoading}
      />
    </div>
  );
}