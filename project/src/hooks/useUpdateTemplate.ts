import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskTemplateItem } from '../types/templates';

type UpdateTemplateData = {
  name: string;
  description: string;
  items: TaskTemplateItem[];
};

export function useUpdateTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (templateId: string, data: UpdateTemplateData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Update template
      const { error: templateError } = await supabase
        .from('task_templates')
        .update({
          name: data.name,
          description: data.description
        })
        .eq('id', templateId);

      if (templateError) throw templateError;

      // Delete existing items
      const { error: deleteError } = await supabase
        .from('task_template_items')
        .delete()
        .eq('template_id', templateId);

      if (deleteError) throw deleteError;

      // Create new items with todos
      const { error: itemsError } = await supabase
        .from('task_template_items')
        .insert(
          data.items.map((item, index) => ({
            template_id: templateId,
            name: item.name,
            duration_days: item.duration_days,
            details_template: item.details_template,
            order_index: index + 1,
            todos: item.todos || [] // Ensure todos are included
          }))
        );

      if (itemsError) throw itemsError;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to update template');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}