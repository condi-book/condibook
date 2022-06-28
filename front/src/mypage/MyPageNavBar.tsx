import React from "react";
import styled from "styled-components";
import { MypageProps } from "./MyPage";

const MypageNavbar = ({
  handleClick,
  tab,
}: MypageProps): React.ReactElement => {
  return (
    <Div tab={tab}>
      <div className="nav-bar-wrap">
        <div className="nav-bar">
          <span onClick={() => handleClick(true)}>나의 북마크</span>
          <span onClick={() => handleClick(false)}>스크랩한 북마크</span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<MypageProps>`
  width: 100%;
  height: 10%;

  .nav-bar-wrap {
    width: 100%;
    padding: 10px;
    
  }

  .nav-bar {
    // border-bottom-left-radius: 10px;
    // border-bottom-right-radius: 10px;
    display: flex;
    width: 100%;
    background: ${({ theme }) => theme.profileBackground};

    span { 
      width: 50%;
      text-align: center;
      font-size: 1.5vw;
      font-weight: 600;
      cursor: pointer;
    }

    span:first-of-type {
      background: white;
      padding-bottom: ${({ tab }) => (tab ? "0" : "5px")};
      margin-bottom: ${({ tab }) => (tab ? "5px" : "0")};
      color: ${({ tab, theme }) => (tab ? theme.subBlackColor : "#dcdcdc")};


  }
    span:last-of-type {
      background: white;
      padding-bottom: ${({ tab }) => (!tab ? "0" : "5px")};
      margin-bottom: ${({ tab }) => (!tab ? "5px" : "0")};
      color: ${({ tab, theme }) => (!tab ? theme.subBlackColor : "#dcdcdc")};
      
    }
`;

export default MypageNavbar;
