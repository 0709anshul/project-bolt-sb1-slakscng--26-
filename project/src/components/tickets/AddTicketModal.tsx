import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateTicket } from '../../hooks/useCreateTicket';
import { RequestForm } from './forms/RequestForm';
import type { CreateTicketData } from '../../types/tickets';

type AddTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddTicketModal({ isOpen, onClose, onSuccess }: AddTicketModalProps) {
  const { create, isLoading, error } = useCreateTicket();
  const [formData, setFormData] = useState<CreateTicketData>({
    title: '',
    description: '',
    category: 'Others',
    priority: 'medium',
    organization_id: '',
    attachments: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error handling is managed by useCreateTicket
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">New Service Request</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
              {error.message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <RequestForm
              formData={formData}
              onChange={(data) => setFormData({ ...formData, ...data })}
              isLoading={isLoading}
            />
          </div>
          
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}