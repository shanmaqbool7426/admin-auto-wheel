export const DOMAIN = typeof window !== 'undefined' ? window.location.origin : '';
export const BASE_URL = process?.env?.NEXT_PUBLIC_FE_BASE;
export const FE_BASE_URL = process?.env?.NEXT_PUBLIC_FE_BASE || DOMAIN;
