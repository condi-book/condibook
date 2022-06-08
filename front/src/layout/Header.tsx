import React from "react";
import styled from "styled-components";
const Header = () => {
  return (
    <Div>
      <div className="sub-content">
        <img alt="로고" />
        <div className="button-group">
          <button className="info-button">서비스 소개</button>
          <button className="login-button">로그인 / 회원가입</button>
        </div>
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
    }
  }

  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 20%;

    button:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`;
export default Header;
