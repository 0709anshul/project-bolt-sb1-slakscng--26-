import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

type MenuSectionProps = {
  title?: string;
  items: MenuItem[];
  defaultExpanded?: boolean;
};

export function MenuSection({ title, items, defaultExpanded = true }: MenuSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const location = useLocation();

  return (
    <div className="space-y-1">
      {title && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-indigo-300 uppercase font-medium hover:text-indigo-200"
        >
          {title}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}
      
      {isExpanded && (
        <div className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ${
                location.pathname === item.href ? 'bg-indigo-700' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}