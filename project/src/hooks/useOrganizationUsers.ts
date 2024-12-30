import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/users';

export function useOrganizationUsers(organizationId: string | undefined) {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      if (!organizationId) {
        setData(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // First get Leumas staff
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
          .in('role', ['admin', 'manager', 'staff']);

        if (leumasError) throw leumasError;

        // Then get brand users
        const { data: brandUsers, error: brandError } = await supabase
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
          .neq('organization.name', 'Leumas');

        if (brandError) throw brandError;

        // Combine and sort users
        const allUsers = [
          ...(leumasStaff || []),
          ...(brandUsers || [])
        ].sort((a, b) => {
          // Sort by role first (admin, manager, staff, brand_user)
          const roleOrder = { admin: 0, manager: 1, staff: 2, brand_user: 3 };
          const roleCompare = (roleOrder[a.role as keyof typeof roleOrder] || 4) - 
                            (roleOrder[b.role as keyof typeof roleOrder] || 4);
          
          if (roleCompare !== 0) return roleCompare;
          
          // Then by name
          return a.full_name.localeCompare(b.full_name);
        });

        setData(allUsers);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Error loading users'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [organizationId]);

  return { data, isLoading, error };
}