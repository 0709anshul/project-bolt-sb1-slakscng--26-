import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { TaskTemplate, TaskTemplateItem } from '../types/templates';

export function useTaskTemplates() {
  const [templates, setTemplates] = useState<TaskTemplate[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      const { data, error: queryError } = await supabase
        .from('task_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (queryError) throw queryError;
      setTemplates(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Error loading templates'));
      setTemplates(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTemplateItems = useCallback(async (templateId: string): Promise<TaskTemplateItem[]> => {
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
      console.error('Error loading template items:', e);
      throw e instanceof Error ? e : new Error('Error loading template items');
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    isLoading,
    error,
    getTemplateItems,
    refetch: fetchTemplates
  };
}