import React from 'react';
import { TaskRow } from './TaskRow';
import type { Task } from '../../types/orders';

type TasksListProps = {
  tasks: Task[];
};

export function TasksList({ tasks }: TasksListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}