import React, { useState, useContext } from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";
import MypageNavbar from "./MyPageNavBar";
import MypageBookmark from "./MyPageBookMark";
import MypageScrapedBookmark from "./MyPageScrapedBookMark";
import { KeyboardContext } from "../App";

export interface MypageProps {
  handleClick?: (value: boolean) => void;
  tab: boolean;
  show?: boolean;
}

export const Mypage = () => {
  const [tab, setTab] = useState<MypageProps["tab"]>(true);
  const keyboardContext: any = useContext(KeyboardContext);

  const handleClick = (value: boolean) => {
    if (value !== tab) setTab((prev) => !prev);
  };

  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <div className="mypage-container">
        <div className="mypage-main">
          <MypageNavbar tab={tab} handleClick={handleClick} />
          {tab ? <MypageBookmark /> : <MypageScrapedBookmark />}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #eff6fc;

  .mypage-container {
    width: 100%;
    padding: 10px 10px 10px 0;
  }

  .mypage-main {
    width: 100%;
    background: white;
    border-radius: 10px;
    height: 100%;
    border: 1px solid yellow;
  }
`;
