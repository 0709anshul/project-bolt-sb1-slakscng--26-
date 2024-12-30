import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TodoItem } from '../types/todos';

export function useTaskTodos(taskId: string) {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('task_todos')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at');

      if (error) throw error;
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [taskId]);

  const addTodo = async (description: string, isPrivate: boolean = false) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('task_todos')
        .insert({
          task_id: taskId,
          description,
          is_private: isPrivate,
          completed: false
        });

      if (error) throw error;
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (todoId: string, completed: boolean) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('task_todos')
        .update({ completed })
        .eq('id', todoId);

      if (error) throw error;
      await fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('task_todos')
        .delete()
        .eq('id', todoId);

      if (error) throw error;
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { todos, isLoading, addTodo, toggleTodo, deleteTodo, refetch: fetchTodos };
}