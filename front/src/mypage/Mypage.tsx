import React from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";
import MypageNavbar from "./MypageNavbar";

const Mypage = () => {
  return (
    <Div>
      <SideBar />
      <div className="mypage-container">
        <MypageNavbar />
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
