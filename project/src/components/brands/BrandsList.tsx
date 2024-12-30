import React from 'react';
import { Building2 } from 'lucide-react';
import { useBrands } from '../../hooks/useBrands';
import { BrandCard } from './BrandCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function BrandsList() {
  const { data: brands, isLoading, error, refetch } = useBrands();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!brands?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {brands.map((brand) => (
        <BrandCard 
          key={brand.id} 
          brand={brand}
          onUpdate={refetch}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <Building2 className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No brands</h3>
      <p className="mt-1 text-sm text-gray-500">No customer brands found.</p>
    </div>
  );
}