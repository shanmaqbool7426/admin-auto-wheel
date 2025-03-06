export const END_POINTS = {
  // ... existing endpoints ...

  // User Profile Management
  GET_PROFILE: '/user/profile',
  LOGIN: '/user/login',
  UPDATE_PROFILE: '/user/profile-update',
  CHANGE_PASSWORD: '/user/change-password-by-userId',
  UPDATE_PROFILE_IMAGES: '/user/update-profile-images',
  GET_USERS: '/user/get-users',
  CREATE_USER: '/user/create',

  UPDATE_PROFIL_BY_EMAIL: "/user/profile-update-by-email",

  // Chat endpoints
  CONVERSATION: '/chat',
  CONVERSATION_LIST: '/chat/list/67302cefa1251b0135c86ea7',

  // Location endpoints
  LOCATION: '/location',
  LOCATION_PROVINCES: '/location/provinces',
  LOCATION_DELETE: '/location/bulk-delete',
  // Footer
  FOOTER: '/footer',
  FOOTER_LINK: '/footer-link',
  FOOTER_LINK_DELETE: '/footer-link/bulk-delete',
  // Used Vehicles endpoints
  USED_VEHICLES: '/vehicle',
  ROLES: '/roles',

  // Blog endpoints
  GET_BLOG_BY_ID: '/blog',
  BLOG_LISTING: '/blog/blog-listing/page/1',
  BLOG_TAGS: '/tag',
  BLOG_SEARCH: '/blog/search',
  BLOG_DELETE: '/blog/bulk-delete',
  BLOG_DELETE_SINGLE: '/blog',
  DUPLICATE_POST: '/blog/duplicate',
  STATUS_COUNTS: '/blog/status-counts',
  BLOG_CREATE: '/blog',
  BLOG_UPDATE: '/blog',

  // Bodies endpoints
  BODIES: '/browes-by-body',

  // Category endpoints
  TAGS: '/tag',
  CATEGORIES: '/category',
  ADD_CATEGORY: '/category',
  UPDATE_CATEGORY: '/category',
  DELETE_CATEGORY: '/category',
  DELETE_MULTIPLE_CATEGORIES: '/category/bulk-delete',

  // Comment endpoints
  COMMENTS: '/comment/filtered',
  COMMENTS_DELETE: '/comment/bulk-delete',
  // Make endpoints
  MAKE: '/browes-by-make',
  MAKE_DELETE: '/make/bulk-delete',

  // Vehicle endpoints
  VEHICLES: '/new-vehicles',
  NEW_VEHICLES: '/new-vehicles',
  GET_VEHICLE_BY_ID: '/new-vehicles/get-vehicle-by-id',
  COMPARISON: '/comparison',
  COMPETITOR: '/competitor',
  BANNER: '/banners',
  NEAR_BY_LOCATION: '/near-by-location',
  NEAR_BY_LOCATION_DELETE: '/near-by-location/bulk-delete',

  FAQ: '/faq',
  FAQ_DELETE: '/faq/bulk-delete',

  FUEL_TYPE: '/fuel-type',
  FUEL_TYPE_DELETE: '/fuel-type/bulk-delete',
  DRIVE: '/drive',
  DRIVE_DELETE: '/drive/bulk-delete',
  TRANSMISSION: '/transmission',
  TRANSMISSION_DELETE: '/transmission/bulk-delete',
  COLOR: '/color',
  COLOR_DELETE: '/color/bulk-delete',

  VIDEO: '/video',

  // Reports endpoint
  REPORTS: '/reports',
}