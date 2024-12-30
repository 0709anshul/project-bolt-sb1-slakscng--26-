import React from 'react';
import { RichTextEditor } from '../common/RichTextEditor';
import { SaveButton } from '../common/SaveButton';
import { useTaskField } from '../../hooks/useTaskField';
import { useUserRole } from '../../hooks/useUserRole';
import type { Task } from '../../types/orders';

type InternalNotesProps = {
  task: Task;
};

export function InternalNotes({ task }: InternalNotesProps) {
  const { isAdmin, isManager, isStaff } = useUserRole();
  const {
    value: notes,
    setValue: setNotes,
    save,
    isLoading,
    error,
    hasChanges
  } = useTaskField(task.id, 'internal_notes', task.internal_notes || '');

  const canViewNotes = isAdmin || isManager || isStaff;

  if (!canViewNotes) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Internal Notes
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
        content={notes}
        onChange={setNotes}
        disabled={isLoading}
      />
    </div>
  );
}