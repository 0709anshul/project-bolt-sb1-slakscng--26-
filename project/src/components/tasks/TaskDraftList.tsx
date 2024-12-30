import React from 'react';
import { X } from 'lucide-react';
import type { TaskDraft } from '../../types/tasks';

type TaskDraftListProps = {
  tasks: TaskDraft[];
  onRemove: (index: number) => void;
};

export function TaskDraftList({ tasks, onRemove }: TaskDraftListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Tasks to Create</h3>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="font-medium">{task.name}</div>
              <div className="text-sm text-gray-500">
                {task.details}
                {task.todos && task.todos.length > 0 && (
                  <span className="ml-2 text-indigo-600">
                    ({task.todos.length} subtasks)
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Duration: {task.duration_days} days
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-gray-400 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}