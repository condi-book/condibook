import React, { useContext } from "react";
import { DispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { removeCookie } from "./util/cookie";

const Logout = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const dispatch: any = useContext(DispatchContext);

  const handleLogout = async () => {
    await sessionStorage.removeItem("userToken");
    await sessionStorage.removeItem("user");
    await dispatch({ type: "LOGOUT" });
    await removeCookie("userToken", {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    await navigate("/", { replace: true });
    // console.log(cookies, setCookie);
  };
  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
