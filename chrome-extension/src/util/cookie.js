import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, option) => {
  return cookies.set(key, value, {
    path: "/",
    expired: new Date().getDate() + 1,
  });
};

export const getCookie = (key) => {
  return cookies.get(key);
};
