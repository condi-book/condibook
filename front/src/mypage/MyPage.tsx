import React, { useState, useContext, useEffect } from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";
import MypageNavbar from "./MyPageNavBar";
import MypageBookmark from "./MyPageBookMark";
import MypageScrapedBookmark from "./MyPageScrapedBookMark";
import SearchButton from "search/SearchButton";
import { UserContext } from "store/userStore";
import LoginRequire from "layout/LoginRequire";
// import { KeyboardContext } from "../App";
import { SideBarContext } from "../App";

export interface MypageProps {
  handleClick?: (value: boolean) => void;
  tab: boolean;
  show?: boolean;
}

export const Mypage = () => {
  const { dispatcher } = useContext(SideBarContext);
  const [tab, setTab] = useState<MypageProps["tab"]>(true);
  const { userState }: any = React.useContext(UserContext);
  const isLoggedIn = userState?.user !== null;
  // const keyboardContext: any = useContext(KeyboardContext);

  const handleClick = (value: boolean) => {
    if (value !== tab) setTab((prev) => !prev);
  };

  useEffect(() => dispatcher({ type: "pe-7s-folder" }), []);

  // return은 hooks 보다 아래쪽에 위치하도록!
  if (!isLoggedIn) {
    return <LoginRequire />;
  }

  return (
    <Div>
      {/* {keyboardContext.sidebar === true && <SideBar />} */}
      <SideBar />
      <SearchButton></SearchButton>
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
  }
`;
