import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';
import { useUserRole } from '../../hooks/useUserRole';

export function TasksHeader() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin, isManager } = useUserRole();
  const canAddTask = isAdmin || isManager;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        {canAddTask && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        )}
      </div>

      {isAddModalOpen && (
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </>
  );
}