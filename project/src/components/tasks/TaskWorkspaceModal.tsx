import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TaskWorkspace } from './TaskWorkspace';
import type { Task } from '../../types/orders';

type TaskWorkspaceModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export function TaskWorkspaceModal({ task, isOpen, onClose }: TaskWorkspaceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <TaskWorkspace task={task} />
        </div>
      </div>
    </div>
  );
}