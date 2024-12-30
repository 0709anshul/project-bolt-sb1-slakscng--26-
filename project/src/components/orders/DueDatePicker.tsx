import React from 'react';
import { Calendar } from 'lucide-react';
import { useUpdateOrderDueDate } from '../../hooks/useUpdateOrderDueDate';
import { formatDate } from '../../utils/date';

type DueDatePickerProps = {
  orderId: string;
  currentDueDate: string | null;
};

export function DueDatePicker({ orderId, currentDueDate }: DueDatePickerProps) {
  const { updateDueDate, isLoading, canUpdateDueDate } = useUpdateOrderDueDate();

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateDueDate(orderId, e.target.value || null);
    } catch (error) {
      console.error('Error updating due date:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-gray-400" />
      {canUpdateDueDate ? (
        <input
          type="date"
          value={currentDueDate || ''}
          onChange={handleDateChange}
          disabled={isLoading}
          className={`
            px-2 py-1 text-sm border rounded
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          `}
        />
      ) : (
        <span className="text-sm text-gray-600">
          {currentDueDate ? formatDate(currentDueDate) : 'Auto-calculated from tasks'}
        </span>
      )}
    </div>
  );
}