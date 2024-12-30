import React from 'react';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import { DeleteButton } from '../common/DeleteButton';

type ProductActionsProps = {
  productId: string;
  onDelete?: () => void;
};

export function ProductActions({ productId, onDelete }: ProductActionsProps) {
  const { deleteProduct, isLoading, canDelete } = useDeleteProduct();

  if (!canDelete) return null;

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <DeleteButton
      onDelete={handleDelete}
      isLoading={isLoading}
      confirmMessage="Are you sure you want to delete this product? This action cannot be undone."
    />
  );
}