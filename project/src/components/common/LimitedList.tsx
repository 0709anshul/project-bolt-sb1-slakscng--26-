import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type LimitedListProps<T> = {
  items: T[] | null;
  limit?: number;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
};

export function LimitedList<T>({ 
  items, 
  limit = 8, // Changed default to 8
  renderItem,
  emptyMessage = 'No items found'
}: LimitedListProps<T>) {
  const [showAll, setShowAll] = useState(false);
  
  if (!items?.length) {
    return <div className="text-center py-4 text-gray-500">{emptyMessage}</div>;
  }

  const displayedItems = showAll ? items : items.slice(0, limit);
  const hasMore = items.length > limit;

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {displayedItems.map(renderItem)}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>{showAll ? 'Show Less' : 'Show More'}</span>
          {showAll ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}