import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GOOGLE_LOGIN_STATE } from "../config";
// import { SERVER_URL, GOOGLE_LOGIN_STATE } from "../config";
import { DispatchContext } from "../App";
import { setCookie } from "./util/cookie";
import Loading from "layout/Loading";
import { Alert } from "layout/Alert";

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
      Alert.fire({
        title: "로그인 실패",
        icon: "error",
      });
      return navigate("/login", { replace: true });
    }

    const code = params.get("code");

    async function sendCode() {
      const url = `${window.location.origin}/api/user/login/google`;
      // const url = SERVER_URL + "/user/login/google";
      const res = await axios.post(url, { code });
      const user = res.data;

      // 쿠키 경로, 유효기간 설정 필수
      await setCookie("userToken", user.token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      });
      await setCookie("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      await Alert.fire({
        icon: "success",
        title: "로그인 성공",
      });
      await navigate("/bookmark", { replace: true });
    }

    sendCode();
  }, []);

  return <Loading />;
};

export default CallBackGoogleLogin;
