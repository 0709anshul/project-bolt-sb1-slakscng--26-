import { useUserRole } from './useUserRole';

export function useCanSplitOrder() {
  const { isAdmin, isManager, isStaff } = useUserRole();
  return isAdmin || isManager || isStaff;
}