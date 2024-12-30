import React from 'react';
import type { TaskDraft } from '../../../types/tasks';

type TaskFormProps = {
  formData: TaskDraft;
  onChange: (data: TaskDraft) => void;
  isLoading?: boolean;
};

export function TaskForm({ formData, onChange, isLoading }: TaskFormProps) {
  return (
    <div className="space-y-4">
      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
          placeholder="e.g., Raw Material Inspection"
        />
      </div>

      {/* Task Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details
        </label>
        <textarea
          value={formData.details}
          onChange={(e) => onChange({ ...formData, details: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
          placeholder="Additional task details or instructions..."
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration (days)
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.duration_days}
          onChange={(e) => onChange({ ...formData, duration_days: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}