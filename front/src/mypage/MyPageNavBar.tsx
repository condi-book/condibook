import React from "react";
import styled from "styled-components";
import { MypageProps } from "./MyPage";

const MypageNavbar = ({ handleClick }: MypageProps): React.ReactElement => {
  return (
    <Div className="container">
      <div>
        <div className="nav-bar">
          <span onClick={() => handleClick(true)}>나의 북마크</span>
          <span onClick={() => handleClick(false)}>스크랩한 북마크</span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;

  .nav-bar {
    border 1px solid rgba(76, 76, 76, 0.1);
    border-radius: 20px;
    display: flex;
    width: 100%;
    

    span {
      padding: 15px 0;
      flex: auto;
      text-align: center;
      font-size: 25px;
      font-weight: 600;
      transition: all 0.4s;
      cursor: pointer;
    }
  }
`;

export default MypageNavbar;
