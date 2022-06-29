import React from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { KeyboardContext } from "../App";

const Community = () => {
  const keyboardContext: any = React.useContext(KeyboardContext);
  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
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
  background: #f8f9fc;
  height: 100vh;

  .community-container {
    margin: auto;
    width: 90vw;
    border: 2px solid red;
    height: 100%;
  }
`;
