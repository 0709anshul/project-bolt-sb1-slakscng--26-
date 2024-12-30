import { supabase } from './supabase';
import type { CreateUserData } from '../types/users';

export async function createUser(userData: CreateUserData) {
  // First check if this is the first user
  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  const isFirstUser = count === 0;

  // For first user, force role to be admin
  const role = isFirstUser ? 'admin' : userData.role;

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Failed to create auth user');

  try {
    // Create user profile
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email,
        full_name: userData.full_name,
        role,
        organization_id: userData.organization_id
      });

    if (userError) throw userError;

    // If this is the first user, sign them in
    if (isFirstUser) {
      await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });
    }

    return authData.user;
  } catch (error) {
    // If profile creation fails, attempt to clean up the auth user
    try {
      await supabase.auth.admin.deleteUser(authData.user.id);
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) throw error;
}