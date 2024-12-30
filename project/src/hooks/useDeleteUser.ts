import { useState } from 'react';
import { deleteUser as deleteUserApi } from '../lib/users';

export function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await deleteUserApi(userId);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading };
}