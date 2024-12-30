import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ProductFormulasList } from '../../components/inventory/formulas/ProductFormulasList';
import { useProducts } from '../../hooks/useProducts';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export default function ProductFormulas() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Product Formulas</h1>
        <ProductFormulasList products={products || []} />
      </div>
    </DashboardLayout>
  );
}