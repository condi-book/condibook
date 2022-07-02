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
  background: #eff6fc;

  .community-container {
    width: 100%;
    padding: 1vw 1vw 1vw 0;
  }
`;
