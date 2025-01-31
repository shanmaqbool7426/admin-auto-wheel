'use client';
import { useState, useEffect } from 'react';
import { useGetRolesQuery } from '@/services/roles';
import { getSafeUserFromCookie } from '@/utils/cookies';

export const usePermissions = () => {
  const { data: roles, isLoading: rolesLoading, error } = useGetRolesQuery();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getSafeUserFromCookie());
    setIsLoading(false);
  }, []);

  const permissions = roles?.data?.roles?.find(
    (role) => role.name?.toLowerCase() === user?.roles?.toLowerCase()
  );

  const hasPermission = (module, action = 'access') => {
    if (!permissions?.permissions?.[module]) return false;
    return permissions.permissions[module][action] || false;
  };

  return {
    hasPermission,
    isLoading: isLoading || rolesLoading,
    error,
    user,
    permissions
  };
};
