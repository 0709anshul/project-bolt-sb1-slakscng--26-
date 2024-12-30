import React from 'react';
import { Trash2 } from 'lucide-react';

type DeleteButtonProps = {
  onDelete: () => void;
  isLoading?: boolean;
  confirmMessage?: string;
  className?: string;
};

export function DeleteButton({ 
  onDelete, 
  isLoading, 
  confirmMessage = 'Are you sure you want to delete this item?',
  className = ''
}: DeleteButtonProps) {
  const handleClick = () => {
    if (window.confirm(confirmMessage)) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`text-red-600 hover:text-red-800 disabled:opacity-50 ${className}`}
      title="Delete"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}