import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";
import MypageNavbar from "./MyPageNavBar";
import MypageBookmark from "./MyPageBookMark";
import MypageScrapedBookmark from "./MyPageScrapedBookMark";

export interface StateProps {
  tab: boolean;
}

export type FunctionProps = {
  handleClick: () => void;
};

const Mypage = () => {
  const [tab, setTab] = useState<StateProps["tab"]>(true);

  const handleClick = () => setTab((prev) => !prev);

  return (
    <Div>
      <SideBar />
      <div className="mypage-container">
        <MypageNavbar handleClick={handleClick} />
        {tab ? <MypageBookmark /> : <MypageScrapedBookmark />}
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;

  .mypage-container {
    width: 90vw;
    border: 2px solid red;
  }
`;

export default Mypage;
