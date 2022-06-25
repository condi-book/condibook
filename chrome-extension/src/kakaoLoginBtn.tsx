import React from "react";
import { CLIENT_URL, KAKAO_CLIENT_ID } from "../config";
import styled from "styled-components";

const KakaoLoginBtn = () => {
  const KAKAO_REDIRECT_URI = CLIENT_URL + "/callback/login/kakao";
  const KAKAO_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  return (
    <Div>
      <a href={KAKAO_REQUEST_URL} id="kakaoSignInDiv">
        <img width="90%" src={`static/img/kakaoButton.png`} />
      </a>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
`;
export default KakaoLoginBtn;
