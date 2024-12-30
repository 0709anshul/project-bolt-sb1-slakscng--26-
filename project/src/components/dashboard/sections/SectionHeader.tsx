import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ActionButton } from '../../common/ActionButton';

type SectionHeaderProps = {
  title: string;
  actionIcon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionIcon, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {actionIcon && actionLabel && onAction && (
        <ActionButton icon={actionIcon} label={actionLabel} onClick={onAction} />
      )}
    </div>
  );
}