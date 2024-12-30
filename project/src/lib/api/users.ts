import { supabase } from '../supabase';
import type { User } from '../../types/users';

export async function fetchAvailableOwners(organizationId: string | null): Promise<User[]> {
  try {
    // Get all Leumas staff
    const { data: leumasStaff, error: leumasError } = await supabase
      .from('users')
      .select(`
        id,
        full_name,
        email,
        role,
        organization:organizations(
          id,
          name
        )
      `)
      .eq('organization.name', 'Leumas')
      .in('role', ['admin', 'manager', 'staff'])
      .order('role', { ascending: true })
      .order('full_name');

    if (leumasError) throw leumasError;

    // Get brand users if organizationId is provided
    let brandUsers: User[] = [];
    if (organizationId) {
      const { data: brandData, error: brandError } = await supabase
        .from('users')
        .select(`
          id,
          full_name,
          email,
          role,
          organization:organizations(
            id,
            name
          )
        `)
        .eq('organization_id', organizationId)
        .eq('role', 'brand_user')
        .order('full_name');

      if (brandError) throw brandError;
      brandUsers = brandData || [];
    }

    // Combine and return all users
    return [...(leumasStaff || []), ...brandUsers];
  } catch (error) {
    console.error('Error fetching available owners:', error);
    throw new Error('Failed to load available owners');
  }
}

export async function fetchLeumasUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        full_name,
        email,
        role,
        organization:organizations(
          id,
          name
        )
      `)
      .eq('organization.name', 'Leumas')
      .in('role', ['admin', 'manager', 'staff'])
      .order('role', { ascending: true })
      .order('full_name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching Leumas users:', error);
    throw new Error('Failed to load Leumas users');
  }
}