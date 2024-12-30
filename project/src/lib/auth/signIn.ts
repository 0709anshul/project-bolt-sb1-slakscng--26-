import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('invalid_credentials');
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}