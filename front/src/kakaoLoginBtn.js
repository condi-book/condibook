import React from "react";
import { CLIENT_URL, KAKAO_CLIENT_ID } from "./config";

const KakaoLoginBtn = () => {
  const KAKAO_REDIRECT_URI = CLIENT_URL + "/callback/login/kakao";
  const KAKAO_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  return (
    <div>
      <a href={KAKAO_REQUEST_URL} id="kakaoSignInDiv">
        카카오로그인
      </a>
    </div>
  );
};

export default KakaoLoginBtn;
