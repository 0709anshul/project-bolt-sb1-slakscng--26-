import { useState, useEffect } from 'react';
import { checkFirstUser } from '../lib/api/auth';

export function useFirstUser() {
  const [isFirstUser, setIsFirstUser] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const result = await checkFirstUser();
        if (mounted) {
          setIsFirstUser(result);
        }
      } catch (error) {
        console.error('First user check failed:', error);
        if (mounted) {
          setIsFirstUser(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    check();

    return () => {
      mounted = false;
    };
  }, []);

  return { isFirstUser, loading };
}