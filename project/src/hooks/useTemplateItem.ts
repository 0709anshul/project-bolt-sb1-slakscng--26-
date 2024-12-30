import { useState, useEffect } from 'react';
import type { TaskTemplateItem, TemplateTodo } from '../types/templates';

export function useTemplateItem(
  item: TaskTemplateItem,
  onChange: (updates: Partial<TaskTemplateItem>) => void
) {
  const [todos, setTodos] = useState<TemplateTodo[]>(item.todos || []);

  // Keep todos in sync with item props
  useEffect(() => {
    setTodos(item.todos || []);
  }, [item.todos]);

  const addTodo = () => {
    const newTodo: TemplateTodo = {
      description: '',
      is_private: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  };

  const removeTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  };

  const updateTodo = (index: number, updates: Partial<TemplateTodo>) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, ...updates } : todo
    );
    setTodos(updatedTodos);
    onChange({ todos: updatedTodos });
  };

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo
  };
}