import React from 'react';
import { BrandFilter } from '../filters/BrandFilter';

type ProductFiltersProps = {
  selectedBrand: string;
  onBrandChange: (value: string) => void;
};

export function ProductFilters({ selectedBrand, onBrandChange }: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <BrandFilter 
        value={selectedBrand}
        onChange={onBrandChange}
        className="w-full md:w-64"
      />
    </div>
  );
}