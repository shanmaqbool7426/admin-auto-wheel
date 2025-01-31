import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';

export const usePermissions = () => {
  const { data: roles, isLoading, error } = useGetRolesQuery();
  const user = getSafeUserFromCookie();

  const permissions = roles?.data?.roles?.find(
    (role) => role.name?.toLowerCase() === user?.roles?.toLowerCase()
  );

  const hasPermission = (module, action = 'access') => {
    if (!permissions?.permissions?.[module]) return false;
    return permissions.permissions[module][action] || false;
  };

  return {
    hasPermission,
    isLoading,
    error,
    user,
    permissions
  };
};
