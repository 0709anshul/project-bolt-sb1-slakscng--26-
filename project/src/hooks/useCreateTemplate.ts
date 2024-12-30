import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskTemplateItem, TemplateTodo } from '../types/templates';

type CreateTemplateData = {
  name: string;
  description: string;
  items: TaskTemplateItem[];
};

export function useCreateTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateTemplateData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create template
      const { data: template, error: templateError } = await supabase
        .from('task_templates')
        .insert({
          name: data.name,
          description: data.description
        })
        .select()
        .single();

      if (templateError) throw templateError;
      if (!template) throw new Error('Failed to create template');

      // Create template items with todos
      const { error: itemsError } = await supabase
        .from('task_template_items')
        .insert(
          data.items.map((item, index) => ({
            template_id: template.id,
            name: item.name,
            duration_days: item.duration_days,
            details_template: item.details_template,
            order_index: index + 1,
            todos: item.todos || [] // Ensure todos are included
          }))
        );

      if (itemsError) throw itemsError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to create template');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}