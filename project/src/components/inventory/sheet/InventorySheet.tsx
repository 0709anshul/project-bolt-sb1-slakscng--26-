import React, { useState } from 'react';
import { useInventoryLevels } from '../../../hooks/inventory/useInventoryLevels';
import { InventoryTable } from './InventoryTable';
import { InventoryFilters } from './InventoryFilters';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import type { MaterialCategory } from '../../../types/inventory';

export function InventorySheet() {
  const { data: levels, isLoading, error } = useInventoryLevels();
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLevels = levels?.filter(level => {
    if (selectedCategory && level.material?.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        level.material?.name.toLowerCase().includes(query) ||
        level.material?.leumas_id.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      <InventoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <InventoryTable levels={filteredLevels || []} />
    </div>
  );
}