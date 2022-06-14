import React from "react";
import styled from "styled-components";
import GoogleLogin from "./googleLogin";
import KakaoLoginBtn from "./kakaoLoginBtn";

const Login = () => {
  return (
    <Div>
      <div className="login-box">
        <div className="logo-box">
          <img alt="로고" />
        </div>
        <div className="button-group">
          <GoogleLogin></GoogleLogin>
          <KakaoLoginBtn></KakaoLoginBtn>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 30%;
    height: 50%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;

    .logo-box {
      height: 20%;
      width: 100%;
    }
    .button-group {
      height: 80%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
export default Login;
