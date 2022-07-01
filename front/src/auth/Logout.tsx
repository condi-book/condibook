import React, { useContext } from "react";
import { DispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "./util/cookie";
import { Alert } from "layout/Alert";
import { Button } from "../user/UserDelete";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch: any = useContext(DispatchContext);

  const handleLogout = async () => {
    await sessionStorage.removeItem("userToken");
    await sessionStorage.removeItem("user");
    await dispatch({ type: "LOGOUT" });
    await removeCookie("userToken", {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    await removeCookie("user", {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    await Alert.fire({
      icon: "success",
      title: "로그아웃 되었습니다.",
    });
    await navigate("/", { replace: true });
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default Logout;
