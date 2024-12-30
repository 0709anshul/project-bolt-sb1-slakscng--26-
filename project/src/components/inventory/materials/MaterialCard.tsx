import React, { useState } from 'react';
import { Package2, Edit2 } from 'lucide-react';
import { MaterialDetailsModal } from './MaterialDetailsModal';
import { MATERIAL_CATEGORIES, UNITS_OF_MEASUREMENT } from '../../../lib/constants/inventory';
import type { Material } from '../../../types/inventory';

type MaterialCardProps = {
  material: Material;
};

export function MaterialCard({ material }: MaterialCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{material.name}</h3>
              <p className="text-sm text-gray-500">{material.leumas_id}</p>
            </div>
          </div>
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">{MATERIAL_CATEGORIES[material.category]}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Unit</span>
            <span className="font-medium">{UNITS_OF_MEASUREMENT[material.unit_of_measurement]}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cost per unit</span>
            <span className="font-medium">₹{material.cost_per_unit}</span>
          </div>
        </div>
      </div>

      {isDetailsOpen && (
        <MaterialDetailsModal
          material={material}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  );
}