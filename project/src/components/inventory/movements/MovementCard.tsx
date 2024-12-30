import React from 'react';
import { ArrowRight, Package2, User2 } from 'lucide-react';
import { STORE_SECTIONS, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import { formatDate } from '../../../utils/date';
import type { InventoryMovement } from '../../../types/inventory';

type MovementCardProps = {
  movement: InventoryMovement;
};

export function MovementCard({ movement }: MovementCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Package2 className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{movement.material?.name}</h3>
            <p className="text-sm text-gray-500">
              {movement.quantity} {UNITS_OF_MEASUREMENT[movement.material?.unit_of_measurement || 'unit']}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(movement.moved_at)}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="text-gray-500">From</p>
            <p className="font-medium">
              {movement.from_section ? STORE_SECTIONS[movement.from_section] : 'External'}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div className="text-sm">
            <p className="text-gray-500">To</p>
            <p className="font-medium">{STORE_SECTIONS[movement.to_section]}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User2 className="h-4 w-4" />
          <span>{movement.moved_by_user?.full_name}</span>
        </div>
      </div>

      {movement.notes && (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Notes:</p>
          <p>{movement.notes}</p>
        </div>
      )}

      {movement.production_order_id && (
        <div className="mt-4 text-sm">
          <span className="text-gray-500">Production Order:</span>{' '}
          <span className="font-medium">PO-{movement.production_order_id}</span>
        </div>
      )}
    </div>
  );
}