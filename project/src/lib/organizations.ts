import { supabase } from './supabase';
import type { Organization } from '../types/organizations';

export async function fetchOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('type', 'Customer Brand')
    .order('name');

  if (error) throw error;
  if (!data) throw new Error('No organizations found');

  return data;
}