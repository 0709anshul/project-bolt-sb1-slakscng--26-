import { useState } from 'react';
import { createUser } from '../lib/users';
import type { CreateUserData } from '../types/users';

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (userData: CreateUserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await createUser(userData);
      return user;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to create user'));
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}