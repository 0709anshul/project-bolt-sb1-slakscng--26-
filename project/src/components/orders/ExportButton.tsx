import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import { exportOrderToPdf } from '../../lib/pdf/orderExport';
import type { ProductionOrder } from '../../types/orders';

type ExportButtonProps = {
  order: ProductionOrder;
};

export function ExportButton({ order }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      exportOrderToPdf(order);
    } catch (error) {
      console.error('Error exporting order:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className={`
        p-2 rounded-full transition-colors
        ${isExporting 
          ? 'bg-gray-100 cursor-wait' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }
      `}
      title="Export to PDF"
    >
      <Printer className={`h-5 w-5 ${isExporting ? 'animate-pulse' : ''}`} />
    </button>
  );
}