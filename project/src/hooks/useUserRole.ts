import { useMemo } from 'react';
import { useCurrentUser } from './useCurrentUser';

export function useUserRole() {
  const { user } = useCurrentUser();

  return useMemo(() => ({
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isStaff: user?.role === 'staff',
    isBrandUser: user?.role === 'brand_user',
    isLeumasStaff: ['admin', 'manager', 'staff'].includes(user?.role || ''),
    // Add role check helper
    hasRole: (roles: string[]) => roles.includes(user?.role || '')
  }), [user?.role]);
}