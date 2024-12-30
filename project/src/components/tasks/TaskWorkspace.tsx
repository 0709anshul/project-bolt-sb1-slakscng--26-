import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { TaskHeader } from './TaskHeader';
import { TaskStatusEdit } from './status/TaskStatusEdit';
import { TaskDuration } from './TaskDuration';
import { OwnerSelect } from './owner/OwnerSelect';
import { TodoList } from './TodoList';
import { TaskHistory } from './TaskHistory';
import { useTaskWorkflow } from '../../hooks/useTaskWorkflow';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useUserRole } from '../../hooks/useUserRole';
import { SaveButton } from '../common/SaveButton';
import type { Task } from '../../types/orders';

type TaskWorkspaceProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export function TaskWorkspace({ task: initialTask, isOpen, onClose }: TaskWorkspaceProps) {
  const { task, isLoading, error } = useTaskWorkflow(initialTask.id);
  const { updateTask, isLoading: isSaving } = useUpdateTask();
  const { isAdmin, isManager } = useUserRole();
  const canToggleDependency = isAdmin || isManager;
  
  // Local state for the toggle
  const [pendingDependencyState, setPendingDependencyState] = useState(initialTask.has_external_dependency);
  const hasUnsavedChanges = task ? pendingDependencyState !== task.has_external_dependency : false;

  const handleToggleDependency = () => {
    setPendingDependencyState(!pendingDependencyState);
  };

  const handleSave = async () => {
    if (!task || !canToggleDependency) return;
    try {
      await updateTask(task.id, {
        has_external_dependency: pendingDependencyState
      });
    } catch (err) {
      console.error('Failed to toggle dependency:', err);
      // Revert local state on error
      setPendingDependencyState(task.has_external_dependency);
    }
  };

  if (!isOpen) return null;

  // Use the fetched task data if available, otherwise fall back to initial task
  const currentTask = task || initialTask;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <TaskHeader task={currentTask} />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {error && <ErrorMessage message={error.message} />}
          
          <div className="space-y-8">
            {/* External Dependency Toggle */}
            {canToggleDependency && (
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pendingDependencyState}
                      onChange={handleToggleDependency}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    External Dependency
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </span>
                </div>
                {hasUnsavedChanges && (
                  <SaveButton 
                    onClick={handleSave}
                    isLoading={isSaving}
                  />
                )}
              </div>
            )}

            {/* Status, Owner and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TaskStatusEdit taskId={currentTask.id} currentStatus={currentTask.status} />
              <OwnerSelect task={currentTask} />
              <TaskDuration task={currentTask} />
            </div>

            {/* Subtasks */}
            <TodoList task={currentTask} />

            {/* History */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">History</h3>
              <TaskHistory task={currentTask} />
            </div>
          </div>

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}