import { supabase } from '../supabase';

export async function signOut(): Promise<void> {
  try {
    // Clear all auth-related storage
    localStorage.removeItem('sb-token');
    localStorage.removeItem('sb-refresh-token');
    localStorage.removeItem('supabase.auth.token');
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}