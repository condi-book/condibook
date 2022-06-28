import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL, GOOGLE_LOGIN_STATE } from "../config";
import { DispatchContext } from "../App";
import { setCookie } from "./util/cookie";
import Loading from "layout/Loading";

const CallBackGoogleLogin = () => {
  const navigate: any = useNavigate();
  const dispatch: any = useContext(DispatchContext);

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;

    // 구글로그인 실패
    if (
      params.get("error") ||
      params.get("state") !== `${GOOGLE_LOGIN_STATE}`
    ) {
      alert("로그인 실패");
      return navigate("/", { replace: true });
    }

    const code = params.get("code");

    async function sendCode() {
      const url = SERVER_URL + "/user/login/google";
      const res = await axios.post(url, { code });
      const user = res.data;

      await sessionStorage.setItem("userToken", user.token);
      await sessionStorage.setItem("user", JSON.stringify(user));
      // 쿠키 경로, 유효기간 설정 필수
      await setCookie("userToken", user.token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      console.log(user);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      await navigate("/bookmark", { replace: true });
    }

    sendCode();
  }, []);

  return <Loading />;
};

export default CallBackGoogleLogin;
