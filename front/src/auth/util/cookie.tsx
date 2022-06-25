import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key: string, value: string, option?: any) => {
  return cookies.set(key, value, { ...option });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};
