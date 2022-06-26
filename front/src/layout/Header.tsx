import React from "react";
import styled from "styled-components";
import { ContextProps } from "./Main";

const Header = ({ userContext, handleNavigate }: ContextProps) => {
  return (
    <Div>
      <div className="sub-content">
        <img src="/static/img/logo.png" alt="로고" />
        <div className="button-group">
          <button className="info-button">
            <a href="#service-info">서비스 소개</a>
          </button>
          <button className="login-button" onClick={handleNavigate}>
            {userContext.user ? "마이페이지로 이동" : "로그인 / 회원가입"}
          </button>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  position: fixed;
  z-index: 10;
  // background: linear-gradient(
  //   98.94deg,
  //   rgba(18, 194, 233, 0.4) 0.61%,
  //   rgba(196, 113, 237, 0.4) 51.86%,
  //   rgba(246, 79, 89, 0.4) 100%
  // );
  background: #111215;
  height: 8vh;
  width: 100vw;
  display: flex;
  flex-direction: row;

  .sub-content {
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img {
      width: 10%;
      height: 60%;
      margin-left: 10%;
    }
  }

  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 20%;
    height: 80%;
    margin-right: 10%;

    button {
      background: none;
      color: white;
      font-size: 1.1vw;
      width: 50%;
      a {
        text-decoration: none;
        color: white;
      }
    }

    button:hover {
      cursor: pointer;
      border: 1px solid white;
    }
  }
`;
export default Header;
