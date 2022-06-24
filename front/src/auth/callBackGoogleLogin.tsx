import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL, GOOGLE_LOGIN_STATE } from "../config";
import { DispatchContext } from "../App";

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
      return await axios.post(url, { code });
    }

    sendCode()
      .then((res) => {
        // email, nickname, image_url, token(JWT) 반환됩니다.
        const user = res.data;

        sessionStorage.setItem("userToken", user.token);
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        alert("로그인 성공");
      })
      .then(navigate("/bookmark", { replace: true }));
  }, []);

  return <div>로그인 처리 중</div>;
};

export default CallBackGoogleLogin;
