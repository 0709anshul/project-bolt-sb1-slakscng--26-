import React from 'react';
import { useAvailableUsers } from '../../hooks/useAvailableUsers';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import type { TaskStatus } from '../../types/orders';

type TasksFiltersProps = {
  filters: {
    poNumber: string;
    dueDate: string;
    status: TaskStatus | '';
    priority: string;
    owner: string;
    showMyTasks: boolean;
  };
  onFilterChange: (key: string, value: string | boolean) => void;
};

export function TasksFilters({ filters, onFilterChange }: TasksFiltersProps) {
  const { users, isLoading: loadingUsers } = useAvailableUsers();
  const { user } = useCurrentUser();

  if (loadingUsers) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <button
          onClick={() => onFilterChange('showMyTasks', !filters.showMyTasks)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filters.showMyTasks
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Tasks
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PO Number
          </label>
          <input
            type="text"
            placeholder="Search PO number"
            value={filters.poNumber}
            onChange={(e) => onFilterChange('poNumber', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="pending_from_client">Pending from Client</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={filters.dueDate}
            onChange={(e) => onFilterChange('dueDate', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="priority">Priority Only</option>
          </select>
        </div>

        {!filters.showMyTasks && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner
            </label>
            <select
              value={filters.owner}
              onChange={(e) => onFilterChange('owner', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Owners</option>
              <option value="unassigned">Unassigned</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}