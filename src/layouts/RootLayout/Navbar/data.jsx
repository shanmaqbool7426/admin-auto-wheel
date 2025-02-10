import {
  IconMenuDashboard,
  IconMenuBlog,
  IconMenuComments,
  IconMenuLocation,
  IconMenuUserManagement,
  IconMenuProfileSettings,
  IconMenuChat,
  IconMenuEmail,
  IconMenuFileManager,
} from '@/assets/icons';
import { PATH_NAME } from '@/constants/pathname';

export const navMenu = [
  { key: 'dashboard', label: 'Dashboard', href: PATH_NAME.ROOT, icon: IconMenuDashboard },
  { key: 'vehicles', label: 'Vehicles', href: PATH_NAME.VEHICLES, icon: IconMenuDashboard },
  { key: 'used-vehicle', label: 'Used Vehicle', href: PATH_NAME.USED_VEHICLE, icon: IconMenuDashboard },
  { key: 'bodies', label: 'Bodies', href: PATH_NAME.BODIES, icon: IconMenuDashboard },
  { key: 'add-vehicle', label: 'Add Vehicle', href: PATH_NAME.ADD_VEHICLE, icon: IconMenuDashboard },
  {
    key: 'blog', label: 'Blog', href: PATH_NAME.BLOG_ALL_POSTS, icon: IconMenuBlog,
    links: [
      { key: 'all-posts', label: 'All Posts', href: PATH_NAME.BLOG_ALL_POSTS },
      { key: 'new-posts', label: 'New Posts', href: PATH_NAME.BLOG_NEW_POSTS },
      { key: 'category', label: 'Category', href: PATH_NAME.BLOG_CATEGORY },
      { key: 'tag', label: 'Tag', href: PATH_NAME.BLOG_TAG },
    ],
  },
  { key: 'comments', label: 'Comments', href: PATH_NAME.COMMENTS, icon: IconMenuComments },
  { key: 'compare-vehicle', label: 'Compare Vehicles', href: PATH_NAME.COMPARE_VEHICLES, icon: IconMenuComments },
  { key: 'location', label: 'Location', href: PATH_NAME.LOCATION, icon: IconMenuLocation },
  { key: 'makes', label: 'Makes', href: PATH_NAME.MAKES, icon: IconMenuLocation },
  { key: 'video', label: 'Video', href: PATH_NAME.VIDEO, icon: IconMenuLocation },
  {
    key: 'user-management', label: 'User Management', href: PATH_NAME.USER_MANAGEMENT_USERS_LIST, icon: IconMenuUserManagement,
    links: [
      { key: 'all-users', label: 'All Users', href: PATH_NAME.USER_MANAGEMENT_USERS_LIST },
      { key: 'user-roles', label: 'User Roles', href: PATH_NAME.USER_MANANAEMENT_USER_ROLES },
    ],
  },
  { key: 'profile-settings', label: 'Profile Settings', href: PATH_NAME.PROFILE_SETTINGS, icon: IconMenuProfileSettings },
  { key: 'chat', label: 'Chat', href: PATH_NAME.CHAT, icon: IconMenuChat },
  { key: 'email', label: 'Email', href: PATH_NAME.EMAIL, icon: IconMenuEmail },
  { key: 'file-manager', label: 'File Manager', href: PATH_NAME.FILE_MANAGER, icon: IconMenuFileManager },
  { key: 'settings', label: 'Settings', href: PATH_NAME.SETTINGS_BANNER, icon: IconMenuProfileSettings, links: [
    { key: 'banner', label: 'Banner', href: PATH_NAME.SETTINGS_BANNER },
    { key: 'near-by-location', label: 'Near By Location', href: PATH_NAME.SETTINGS_NEAR_BY_LOCATION },
    // { key: 'notifications', label: 'Notifications', href: PATH_NAME.SETTINGS_NOTIFICATIONS },
    // { key: 'security', label: 'Security', href: PATH_NAME.SETTINGS_SECURITY },
  ] },
];
