import React from 'react';
import { useOrganizations } from '../../hooks/useOrganizations';
import { useUserRole } from '../../hooks/useUserRole';
import { LoadingSpinner } from '../common/LoadingSpinner';

type BrandFilterProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function BrandFilter({ value, onChange, className = '' }: BrandFilterProps) {
  const { data: organizations, isLoading } = useOrganizations();
  const { isLeumasStaff } = useUserRole();

  // Only show filter for Leumas staff
  if (!isLeumasStaff) return null;
  if (isLoading) return <LoadingSpinner />;
  if (!organizations?.length) return null;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Brand
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Brands</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.name}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
}