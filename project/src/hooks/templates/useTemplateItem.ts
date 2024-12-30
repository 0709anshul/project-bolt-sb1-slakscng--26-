import { useState, useCallback } from 'react';
import type { TaskTemplateItem, TemplateTodo } from '../../types/templates';

export function useTemplateItem(
  item: TaskTemplateItem,
  onChange: (updates: Partial<TaskTemplateItem>) => void
) {
  const [todos, setTodos] = useState<TemplateTodo[]>(item.todos || []);

  const addTodo = useCallback(() => {
    const newTodo: TemplateTodo = {
      description: '',
      is_private: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  }, [todos, onChange]);

  const removeTodo = useCallback((index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  }, [todos, onChange]);

  const updateTodo = useCallback((index: number, updates: Partial<TemplateTodo>) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, ...updates } : todo
    );
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  }, [todos, onChange]);

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo
  };
}