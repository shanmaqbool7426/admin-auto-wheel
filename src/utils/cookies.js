// setCookie, getCookie, removeCookie
import cookies from 'js-cookie';
export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, options);
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};

