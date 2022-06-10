import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "./config";

const CallBackKakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    async function sendCode() {
      const url = SERVER_URL + "/user/login/kakao";
      return await axios.post(url, { code });
    }

    sendCode()
      .then((res) => {
        console.log(res.data); // email, nickname, image_url, token(JWT) 반환됩니다.
      })
      .then(navigate("/", { replace: true }));
  }, []);

  return <div>로그인 처리 중</div>;
};

export default CallBackKakaoLogin;
