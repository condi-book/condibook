import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (key: string, value: string, option?: any) => {
  return cookies.set(key, value, { ...option });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie: any = (key: string, option?: any) => {
  return cookies.remove(key, { ...option });
};
