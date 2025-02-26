'use client';
// setCookie, getCookie, removeCookie
// USE HERE LOCAL STORAGE
import cookies from 'js-cookie';

export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, options);
};

export const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};

export const getSafeUserFromCookie = () => {
  if (typeof window === 'undefined') return null;
  
  const userCookie = getCookie('user');
  if (!userCookie) return null;
  
  try {
    return JSON.parse(userCookie);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

