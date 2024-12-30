import React from 'react';
import type { TemplateFormData } from '../../../types/templates';

type TemplateFormProps = {
  data: TemplateFormData;
  onChange: (data: Partial<TemplateFormData>) => void;
  disabled?: boolean;
};

export function TemplateForm({ data, onChange, disabled }: TemplateFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Template Name
        </label>
        <input
          type="text"
          required
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>
    </div>
  );
}