import React from 'react';
import { useOrganizations } from '../../../hooks/useOrganizations';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { TICKET_CATEGORIES, getCategoryPlaceholder } from '../../../utils/tickets';
import { FileUpload } from '../../common/FileUpload';
import type { CreateTicketData } from '../../../types/tickets';

type RequestFormProps = {
  formData: CreateTicketData;
  onChange: (data: Partial<CreateTicketData>) => void;
  isLoading: boolean;
};

export function RequestForm({ formData, onChange, isLoading }: RequestFormProps) {
  const { data: organizations } = useOrganizations();
  const { user } = useCurrentUser();
  const isBrandUser = user?.role === 'brand_user';

  return (
    <div className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto px-1">
      {!isBrandUser && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            required
            value={formData.organization_id}
            onChange={(e) => onChange({ organization_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={isLoading}
          >
            <option value="">Select Brand</option>
            {organizations?.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          required
          value={formData.category}
          onChange={(e) => onChange({ 
            category: e.target.value as CreateTicketData['category'],
            description: '' // Reset description when category changes
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {TICKET_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          placeholder={getCategoryPlaceholder(formData.category)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          required
          value={formData.priority}
          onChange={(e) => onChange({ priority: e.target.value as CreateTicketData['priority'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments
        </label>
        <FileUpload
          files={formData.attachments || []}
          onChange={(files) => onChange({ attachments: files })}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}