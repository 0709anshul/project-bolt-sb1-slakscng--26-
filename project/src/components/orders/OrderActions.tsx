import React from 'react';
import { useDeleteOrder } from '../../hooks/useDeleteOrder';
import { DeleteButton } from '../common/DeleteButton';

type OrderActionsProps = {
  orderId: string;
  onDelete?: () => void;
};

export function OrderActions({ orderId, onDelete }: OrderActionsProps) {
  const { deleteOrder, isLoading, canDelete } = useDeleteOrder();

  if (!canDelete) return null;

  const handleDelete = async () => {
    try {
      await deleteOrder(orderId);
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  return (
    <DeleteButton
      onDelete={handleDelete}
      isLoading={isLoading}
      confirmMessage="Are you sure you want to delete this production order? This action cannot be undone."
    />
  );
}