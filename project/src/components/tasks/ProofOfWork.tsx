import React from 'react';
import { TaskText } from './TaskText';
import { TaskFiles } from './TaskFiles';
import type { Task } from '../../types/orders';

type ProofOfWorkProps = {
  task: Task;
};

export function ProofOfWork({ task }: ProofOfWorkProps) {
  return (
    <div className="space-y-6">
      <TaskText task={task} />
      <TaskFiles task={task} />
    </div>
  );
}