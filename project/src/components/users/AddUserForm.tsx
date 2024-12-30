import React from 'react';
import type { CreateUserData } from '../../types/users';

type AddUserFormProps = {
  formData: CreateUserData;
  onChange: (data: Partial<CreateUserData>) => void;
  organizations: Array<{ id: string; name: string; }> | null;
  isLoading: boolean;
};

export function AddUserForm({ formData, onChange, organizations, isLoading }: AddUserFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={formData.password}
          onChange={(e) => onChange({ password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          required
          value={formData.role}
          onChange={(e) => onChange({ role: e.target.value as CreateUserData['role'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="brand_user">Brand User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Organization
        </label>
        <select
          required
          value={formData.organization_id}
          onChange={(e) => onChange({ organization_id: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <option value="">Select Organization</option>
          {organizations?.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          value={formData.department || ''}
          onChange={(e) => onChange({ department: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}