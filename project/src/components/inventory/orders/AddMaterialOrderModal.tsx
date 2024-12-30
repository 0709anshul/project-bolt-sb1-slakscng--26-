import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateMaterialOrder } from '../../../hooks/inventory/useCreateMaterialOrder';
import { MaterialIndentForm } from './MaterialIndentForm';

type AddMaterialOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddMaterialOrderModal({ isOpen, onClose, onSuccess }: AddMaterialOrderModalProps) {
  const { createOrder, isLoading, error } = useCreateMaterialOrder();

  const handleSubmit = async (materials: { material_id: string; quantity: number; production_order_id: string }[]) => {
    try {
      // Create orders for each material
      await Promise.all(
        materials.map(material => 
          createOrder({
            material_id: material.material_id,
            quantity: material.quantity,
            production_order_id: material.production_order_id,
            order_date: new Date().toISOString().split('T')[0]
          })
        )
      );
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Failed to create orders:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Material Orders</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}

        <MaterialIndentForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}