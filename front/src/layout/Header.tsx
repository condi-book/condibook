import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleLogin from "../googleLogin";
import KakaoLoginBtn from "../kakaoLoginBtn";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Div>
      <div className="sub-content">
        <img alt="로고" />
        <div className="button-group">
          <button className="info-button">서비스 소개</button>
          <button className="login-button" onClick={() => navigate("/login")}>
            로그인 / 회원가입
          </button>
        </div>
        <GoogleLogin></GoogleLogin>
        <KakaoLoginBtn></KakaoLoginBtn>
      </div>
    </Div>
  );
};

const Div = styled.div`
  border: 2px black solid;
  // background: ${({ theme }) => theme.mainColor};

  height: 8vh;
  width: 100vw;
  display: flex;
  flex-direction: row;

  .sub-content {
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    img {
      border: 2px solid black;
      width: 20%;
      height: 6vh;
    }
  }

  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 20%;
    height: 6vh;

    button:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`;
export default Header;
