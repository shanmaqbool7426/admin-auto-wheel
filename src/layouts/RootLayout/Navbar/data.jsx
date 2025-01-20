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
  { label: 'Dashboard', href: PATH_NAME.ROOT, icon: IconMenuDashboard },
  { label: 'Vehicles', href: PATH_NAME.VEHICLES, icon: IconMenuDashboard },
  { label: 'Add Vehicle', href: PATH_NAME.ADD_VEHICLE, icon: IconMenuDashboard },
  {
    label: 'Blog', href: PATH_NAME.BLOG_ALL_POSTS, icon: IconMenuBlog,
    links: [
      { label: 'All Posts', href: PATH_NAME.BLOG_ALL_POSTS },
      { label: 'New Posts', href: PATH_NAME.BLOG_NEW_POSTS },
      { label: 'Category', href: PATH_NAME.BLOG_CATEGORY },
      { label: 'Tag', href: PATH_NAME.BLOG_TAG },
    ],
  },
  { label: 'Comments', href: PATH_NAME.COMMENTS, icon: IconMenuComments },
  { label: 'Compare Vehicles', href: PATH_NAME.COMPARE_VEHICLES, icon: IconMenuComments },
  { label: 'Location', href: PATH_NAME.LOCATION, icon: IconMenuLocation },
  { label: 'Makes', href: PATH_NAME.MAKES, icon: IconMenuLocation },
  {
    label: 'User Management', href: PATH_NAME.USER_MANAGEMENT_USERS_LIST, icon: IconMenuUserManagement,
    links: [
      { label: 'All Users', href: PATH_NAME.USER_MANAGEMENT_USERS_LIST },
      { label: 'User Roles', href: PATH_NAME.USER_MANANAEMENT_USER_ROLES },
    ],
  },
  { label: 'Profile Settings', href: PATH_NAME.PROFILE_SETTINGS, icon: IconMenuProfileSettings },
  { label: 'Chat', href: PATH_NAME.CHAT, icon: IconMenuChat },
  { label: 'Email', href: PATH_NAME.EMAIL, icon: IconMenuEmail },
  { label: 'File Manager', href: PATH_NAME.FILE_MANAGER, icon: IconMenuFileManager },
  { label: 'Settings', href: PATH_NAME.SETTINGS_BANNER, icon: IconMenuProfileSettings, links: [
    { label: 'Banner', href: PATH_NAME.SETTINGS_BANNER },
    // { label: 'Notifications', href: PATH_NAME.SETTINGS_NOTIFICATIONS },
    // { label: 'Security', href: PATH_NAME.SETTINGS_SECURITY },
  ] },
];
