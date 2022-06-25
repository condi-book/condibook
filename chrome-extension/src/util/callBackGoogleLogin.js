import React, { useEffect } from "react";

import { SERVER_URL, GOOGLE_LOGIN_STATE } from "../config";

const CallBackGoogleLogin = () => {
  // useEffect(() => {
  //   const params = new URL(window.location.href).searchParams;

  //   // 구글로그인 실패
  //   if (
  //     params.get("error") ||
  //     params.get("state") !== `${GOOGLE_LOGIN_STATE}`
  //   ) {
  //     alert("로그인 실패");
  //     return
  //   }

  //   const code = params.get("code");

  //   async function sendCode() {
  //     const url = SERVER_URL + "/user/login/google";
  //     const res = await axios.post(url, { code });
  //     const user = res.data;

  //     await sessionStorage.setItem("userToken", user.token);
  //     await sessionStorage.setItem("user", JSON.stringify(user));
  //     console.log(user);
  //     dispatch({
  //       type: "LOGIN_SUCCESS",
  //       payload: user,
  //     });

  //     await navigate("/bookmark", { replace: true });
  //   }

  //   sendCode();
  // }, []);

  return <div>로그인 처리 중</div>;
};

export default CallBackGoogleLogin;
