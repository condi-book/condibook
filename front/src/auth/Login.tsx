import React from "react";
import styled from "styled-components";
import GoogleLoginBtn from "./googleLoginBtn";
import KakaoLoginBtn from "./kakaoLoginBtn";

const Login = () => {
  return (
    <Div>
      <div className="login-box">
        <div className="logo-box">
          <img width="35px" src="/static/img/symbol.png" alt="로고" />
        </div>
        <div className="login-explanation">
          <h3>Welcome Back!</h3>
          <div className="first">Ready to use your amazing</div>
          <div className="second"> bookmark manage service?</div>
        </div>
        <div className="button-group">
          <GoogleLoginBtn></GoogleLoginBtn>
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
  background: ${({ theme }) => theme.lightMainColor};
  .login-box {
    width: 400px;
    height: 500px;
    background: ${({ theme }) => theme.middleMainColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;

    .logo-box {
      height: 20%;
      width: 100%;
      text-align: center;

      img {
        margin-top: 40px;
      }
    }
    .button-group {
      height: 80%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .login-explanation {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-weight: bold;
    }

    .first {
      margin-right: 40px;
    }

    .second {
      margin-left: 40px;
    }
  }
`;
export default Login;
