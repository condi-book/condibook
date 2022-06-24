import React from "react";
import { CLIENT_URL, GOOGLE_CLIENT_ID, GOOGLE_LOGIN_STATE } from "../config";
import styled from "styled-components";

const GoogleLoginBtn = () => {
  const GOOGLE_REDIRECT_URI = CLIENT_URL + "/callback/login/google";

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
        {/* <img width="90%" src={`static/img/kakaoButton.png`} /> */}
        구글로그인
      </a>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
`;
export default GoogleLoginBtn;
