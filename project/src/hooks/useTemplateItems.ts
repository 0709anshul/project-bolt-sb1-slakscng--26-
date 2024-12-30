import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskTemplateItem } from '../types/templates';

export function useTemplateItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = useCallback(async (templateId: string): Promise<TaskTemplateItem[]> => {
    if (!templateId) {
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('task_template_items')
        .select(`
          id,
          template_id,
          name,
          duration_days,
          order_index,
          details_template,
          todos
        `)
        .eq('template_id', templateId)
        .order('order_index');

      if (queryError) throw queryError;

      // Ensure todos is always an array
      return (data || []).map(item => ({
        ...item,
        todos: Array.isArray(item.todos) ? item.todos : []
      }));
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Error loading template items');
      setError(error);
      console.error('Template items fetch error:', e);
      return []; // Return empty array instead of throwing
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchItems, isLoading, error };
}