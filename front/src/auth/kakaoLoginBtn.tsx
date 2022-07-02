import React from "react";
import { KAKAO_CLIENT_ID } from "../config";
import styled from "styled-components";

const KakaoLoginBtn = () => {
  const KAKAO_REDIRECT_URI = `${window.location.origin}/callback/login/kakao`;
  const KAKAO_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  return (
    <Div>
      <a href={KAKAO_REQUEST_URL} id="kakaoSignInDiv">
        <img width="25px" src="/static/img/kakaoSymbol.png" alt="kakaoSymbol" />
        <div>Kakao로 시작하기</div>
      </a>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
  background: #fee500;
  width: 90%;
  border-radius: 5px;
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    background: white;
    border: 1px solid #fee500;
  }

  #kakaoSignInDiv {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;

    img {
      margin-left: 10px;
    }

    div {
      width: 100%;
      text-align: center;
      font-weight: bold;
      color: rgba(60, 30, 30, 1);
    }
  }
`;
export default KakaoLoginBtn;
