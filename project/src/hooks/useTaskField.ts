import { useState, useCallback } from 'react';
import { updateTaskField } from '../lib/utils/task';

export function useTaskField<T>(taskId: string, fieldName: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const save = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await updateTaskField(taskId, fieldName, value);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(`Failed to save ${fieldName}`);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [taskId, fieldName, value]);

  return {
    value,
    setValue,
    save,
    isLoading,
    error,
    hasChanges: value !== initialValue
  };
}