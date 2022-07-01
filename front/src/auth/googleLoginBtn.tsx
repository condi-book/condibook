import React from "react";
import { GOOGLE_CLIENT_ID, GOOGLE_LOGIN_STATE } from "../config";
import styled from "styled-components";

const GoogleLoginBtn = () => {
  const GOOGLE_REDIRECT_URI = `${window.location.origin}/callback/login/google`;

  const params = new URLSearchParams({
    scope: "https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    include_granted_scopes: "true",
    response_type: "code",
    state: `${GOOGLE_LOGIN_STATE}`,
    redirect_uri: `${GOOGLE_REDIRECT_URI}`,
    client_id: `${GOOGLE_CLIENT_ID}`,
  });
  const GOOGLE_REQUEST_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return (
    <Div>
      <a href={GOOGLE_REQUEST_URL} id="googleSignInDiv">
        <img src="/static/img/googleLogo.svg" alt="googleLogo" />
        <div>Google로 시작하기</div>
      </a>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
  background: #4285f4;
  width: 90%;
  border-radius: 5px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 3%;

  &:hover {
    background: white;
    border: 1px solid #4285f4;

    #googleSignInDiv div {
      color: #4285f4;
    }
  }

  #googleSignInDiv {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;

    div {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
  }
`;
export default GoogleLoginBtn;
