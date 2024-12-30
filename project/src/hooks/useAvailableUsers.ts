import { useEffect, useState } from 'react';
import { fetchAvailableOwners } from '../lib/api/users';
import type { User } from '../types/users';

export function useAvailableUsers(brandOrgId: string | undefined | null) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        setError(null);
        const availableUsers = await fetchAvailableOwners(brandOrgId || null);
        setUsers(availableUsers);
      } catch (e) {
        console.error('Error loading users:', e);
        setError(e instanceof Error ? e : new Error('Failed to load users'));
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [brandOrgId]);

  return { users, isLoading, error };
}