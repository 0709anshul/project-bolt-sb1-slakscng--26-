import React from 'react';
import { Package2 } from 'lucide-react';
import { useMaterials } from '../../../hooks/inventory/useMaterials';
import { MaterialCard } from './MaterialCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { MATERIAL_CATEGORIES } from '../../../lib/constants/inventory';

export function MaterialsList() {
  const { data: materials, isLoading, error } = useMaterials();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!materials?.length) return <EmptyState />;

  // Group materials by category
  const groupedMaterials = materials.reduce((acc, material) => {
    const category = material.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(material);
    return acc;
  }, {} as Record<string, typeof materials>);

  return (
    <div className="space-y-8">
      {Object.entries(MATERIAL_CATEGORIES).map(([category, label]) => (
        <div key={category}>
          <h2 className="text-lg font-medium text-gray-900 mb-4">{label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedMaterials[category]?.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <Package2 className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No materials</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a new material.</p>
    </div>
  );
}