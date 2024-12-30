import React from 'react';
import { useOrganizations } from '../../hooks/useOrganizations';
import { useUserRole } from '../../hooks/useUserRole';
import type { TicketStatus } from '../../types/tickets';

type TicketFiltersProps = {
  filters: {
    organization: string;
    status: TicketStatus | '';
    dateFrom: string;
    dateTo: string;
  };
  onChange: (key: string, value: string) => void;
};

export function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  const { data: organizations } = useOrganizations();
  const { isAdmin, isManager, isStaff } = useUserRole();
  const showOrgFilter = isAdmin || isManager || isStaff;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className={`grid grid-cols-1 md:grid-cols-${showOrgFilter ? '4' : '3'} gap-4`}>
        {showOrgFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Brand
            </label>
            <select
              value={filters.organization}
              onChange={(e) => onChange('organization', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Brands</option>
              {organizations?.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange('dateFrom', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange('dateTo', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}