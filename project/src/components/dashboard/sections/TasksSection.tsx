import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../../../hooks/useTasks';
import { TaskCard } from '../../tasks/TaskCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { AddTaskModal } from '../../tasks/AddTaskModal';
import { useUserRole } from '../../../hooks/useUserRole';

export function TasksSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: tasks, isLoading, error } = useTasks('pending');
  const { isAdmin, isManager } = useUserRole();
  const canAddTask = isAdmin || isManager;

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Production Tasks</h2>
        {canAddTask && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}

      <div className="space-y-4">
        {tasks?.length ? (
          tasks.slice(0, 5).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No pending tasks found
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}