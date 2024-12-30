import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useCreateTask } from '../../hooks/useCreateTask';
import { TaskForm } from './forms/TaskForm';
import { TemplateSelector } from './TemplateSelector';
import { TaskDraftList } from './TaskDraftList';
import { ErrorMessage } from '../common/ErrorMessage';
import type { TaskDraft } from '../../types/tasks';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddTaskModal({ isOpen, onClose, onSuccess }: AddTaskModalProps) {
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { create, isLoading: creating } = useCreateTask();
  const [error, setError] = useState<string | null>(null);
  const [taskDrafts, setTaskDrafts] = useState<TaskDraft[]>([]);
  
  const [formData, setFormData] = useState<TaskDraft>({
    production_order_id: '',
    name: '',
    details: '',
    start_date: new Date().toISOString().split('T')[0],
    duration_days: 1
  });

  const handleSubmit = async () => {
    if (!taskDrafts.length) {
      setError('Please add at least one task');
      return;
    }

    try {
      setError(null);
      
      // Create all tasks sequentially
      for (const task of taskDrafts) {
        await create(task);
      }
      
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error creating tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to create tasks');
    }
  };

  const addTaskDraft = () => {
    if (!formData.production_order_id || !formData.name) {
      setError('Please select an order and provide a task name');
      return;
    }
    setTaskDrafts([...taskDrafts, { ...formData }]);
    setFormData({
      ...formData,
      name: '',
      details: '',
      duration_days: 1
    });
    setError(null);
  };

  const addTemplateTasks = (templateTasks: TaskDraft[]) => {
    if (!formData.production_order_id) {
      setError('Please select a production order first');
      return;
    }
    setTaskDrafts([...taskDrafts, ...templateTasks]);
  };

  const removeTaskDraft = (index: number) => {
    setTaskDrafts(taskDrafts.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Tasks</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="space-y-8">
          {/* Order Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Production Order
            </label>
            <select
              required
              value={formData.production_order_id}
              onChange={(e) => setFormData({ ...formData, production_order_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={loadingOrders || creating}
            >
              <option value="">Select Order</option>
              {orders?.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.po_number} - {order.product.name}
                </option>
              ))}
            </select>
          </div>

          {formData.production_order_id && (
            <>
              {/* Manual Task Creation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Add Task Manually</h3>
                <TaskForm
                  formData={formData}
                  onChange={setFormData}
                  isLoading={creating}
                />
                <button
                  type="button"
                  onClick={addTaskDraft}
                  disabled={creating || !formData.name}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  Add Task
                </button>
              </div>

              {/* Template Section */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Or add from template
                </h3>
                <TemplateSelector
                  productionOrderId={formData.production_order_id}
                  startDate={formData.start_date}
                  onAddTasks={addTemplateTasks}
                  disabled={creating}
                />
              </div>
            </>
          )}

          {/* Task Drafts List */}
          {taskDrafts.length > 0 && (
            <div className="pt-6 border-t">
              <TaskDraftList
                tasks={taskDrafts}
                onRemove={removeTaskDraft}
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={creating}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {creating ? 'Creating Tasks...' : 'Create All Tasks'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}