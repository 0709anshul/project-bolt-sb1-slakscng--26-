import React, { useState } from 'react';
import { Building2, Edit2, MessageSquare } from 'lucide-react';
import type { Organization } from '../../types/organizations';
import { BrandDetailsModal } from './BrandDetailsModal';
import { useUserRole } from '../../hooks/useUserRole';
import { formatDate } from '../../utils/date';

type BrandCardProps = {
  brand: Organization;
  onUpdate?: () => void;
};

export function BrandCard({ brand, onUpdate }: BrandCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canEditBrand = isAdmin || isManager;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-500">Added {formatDate(brand.created_at)}</p>
            </div>
          </div>
          {canEditBrand && (
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Additional Details */}
        <div className="mt-4 space-y-2">
          {brand.contact_person && (
            <p className="text-sm text-gray-600">
              Contact: {brand.contact_person}
            </p>
          )}
          {brand.welcome_message && (
            <div className="mt-3 flex items-start gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <div className="font-medium mb-1">Welcome Message:</div>
                <div className="prose prose-sm max-w-none" 
                  dangerouslySetInnerHTML={{ __html: brand.welcome_message }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isDetailsModalOpen && (
        <BrandDetailsModal
          brand={brand}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}