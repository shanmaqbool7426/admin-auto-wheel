export const checkPermission = (permissions, module) => {
  if (!permissions || !permissions.permissions) return false;
  
  const modulePermissions = permissions.permissions[module];
  return modulePermissions?.access || false;
};

export const getPermissionMapping = () => ({
  dashboard: 'dashboard',
  blog: 'blog',
  comments: 'comments',
  'user-management': 'userManagement',
  chat: 'chat',
  email: 'email',
  'file-manager': 'fileManager',
  vehicles: 'newVehicle',
  'used-vehicle': 'usedVehicle',
  bodies: 'body',
  'compareVehicle': 'compareVehicle',
  makes: 'make',
  location: 'location',
  settings: 'settings',
  video: 'video'
});
