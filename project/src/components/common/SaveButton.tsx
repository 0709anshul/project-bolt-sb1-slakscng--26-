import React from 'react';

type SaveButtonProps = {
  onClick: () => void;
  isLoading: boolean;
};

export function SaveButton({ onClick, isLoading }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
    >
      {isLoading ? 'Saving...' : 'Save Changes'}
    </button>
  );
}