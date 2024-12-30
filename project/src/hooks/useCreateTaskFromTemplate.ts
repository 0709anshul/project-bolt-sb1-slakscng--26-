import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskDraft } from '../types/tasks';

export function useCreateTaskFromTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTask = async (task: TaskDraft) => {
    if (!task.production_order_id) {
      throw new Error('Production order ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create task
      const { data: createdTask, error: taskError } = await supabase
        .from('tasks')
        .insert({
          production_order_id: task.production_order_id,
          name: task.name,
          details: task.details,
          start_date: task.start_date,
          duration_days: task.duration_days,
          owner_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (taskError) throw taskError;
      if (!createdTask) throw new Error('Failed to create task');

      // Create todos if they exist
      if (task.todos?.length) {
        const { error: todosError } = await supabase
          .from('task_todos')
          .insert(
            task.todos.map(todo => ({
              task_id: createdTask.id,
              description: todo.description,
              is_private: todo.is_private,
              completed: false
            }))
          );

        if (todosError) throw todosError;
      }

      return createdTask;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create task from template');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTask, isLoading, error };
}