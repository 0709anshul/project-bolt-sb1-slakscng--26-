import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/auth/signOut';

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      // Still redirect on error since we want to clear the UI state
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut: handleSignOut,
    isLoading
  };
}