import type { User } from '../../types/users';

const ROLE_ORDER = {
  admin: 0,
  manager: 1,
  staff: 2,
  brand_user: 3
} as const;

export function sortUsers(users: User[]): User[] {
  return users.sort((a, b) => {
    // First sort by organization (Leumas first)
    if (a.organization.name === 'Leumas' && b.organization.name !== 'Leumas') return -1;
    if (a.organization.name !== 'Leumas' && b.organization.name === 'Leumas') return 1;

    // Then sort by role
    const roleCompare = (ROLE_ORDER[a.role as keyof typeof ROLE_ORDER] || 4) - 
                       (ROLE_ORDER[b.role as keyof typeof ROLE_ORDER] || 4);
    
    if (roleCompare !== 0) return roleCompare;
    
    // Finally sort by name
    return a.full_name.localeCompare(b.full_name);
  });
}