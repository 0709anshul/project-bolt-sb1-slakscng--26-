import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskDraft } from '../types/tasks';

export function useCreateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: TaskDraft) => {
    if (!data.production_order_id) {
      throw new Error('Production order ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create task
      const { data: task, error: taskError } = await supabase
        .from('tasks')
        .insert({
          production_order_id: data.production_order_id,
          details: data.details || data.name, // Use name as details if not provided
          start_date: data.start_date,
          duration_days: data.duration_days,
          owner_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (taskError) throw taskError;
      if (!task) throw new Error('Failed to create task');

      // Create todos if they exist
      if (data.todos?.length) {
        const { error: todosError } = await supabase
          .from('task_todos')
          .insert(
            data.todos.map(todo => ({
              task_id: task.id,
              description: todo.description,
              is_private: todo.is_private,
              completed: false
            }))
          );

        if (todosError) throw todosError;
      }

      return task;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create task');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}