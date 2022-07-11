import React from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { UserContext } from "store/userStore";
import LoginRequire from "layout/LoginRequire";
// import { KeyboardContext } from "../App";

const Community = () => {
  const { userState }: any = React.useContext(UserContext);
  const isLoggedIn = userState?.user !== null;
  if (!isLoggedIn) {
    return <LoginRequire />;
  }
  // const keyboardContext: any = React.useContext(KeyboardContext);
  return (
    <Div>
      {/* {keyboardContext.sidebar === true && <SideBar />} */}
      <SideBar />
      <div className="community-container">
        <Outlet />
      </div>
    </Div>
  );
};

export default Community;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #eff6fc;

  .community-container {
    width: 100%;
    padding: 1vw 1vw 1vw 0;
  }
`;
