import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";
import { DispatchContext } from "../App";

const CallBackKakaoLogin = () => {
  const navigate: any = useNavigate();
  const dispatch: any = useContext(DispatchContext);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    async function sendCode() {
      const url = SERVER_URL + "/user/login/kakao";
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

export default CallBackKakaoLogin;
