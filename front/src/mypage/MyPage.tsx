import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";
import MypageNavbar from "./MyPageNavBar";
import MypageBookmark from "./MyPageBookMark";
import MypageScrapedBookmark from "./MyPageScrapedBookMark";

export interface MypageProps {
  handleClick: (value: boolean) => void;
  tab: boolean;
  show?: boolean;
}

const Mypage = () => {
  const [tab, setTab] = useState<MypageProps["tab"]>(true);

  const handleClick = (value: boolean) => {
    if (value !== tab) setTab((prev) => !prev);
  };

  return (
    <Div>
      <SideBar />
      <div className="mypage-container">
        <MypageNavbar tab={tab} handleClick={handleClick} />
        {tab ? <MypageBookmark /> : <MypageScrapedBookmark />}
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;

  .mypage-container {
    width: 90vw;
    border: 2px solid red;
  }
`;

export default Mypage;
