import React from "react";
import SideBar from "../layout/SideBar";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import LoginRequire from "layout/LoginRequire";
import { getCookie } from "auth/util/cookie";
// import { KeyboardContext } from "../App";
import { SideBarContext } from "../App";

const Community = () => {
  const { dispatcher } = React.useContext(SideBarContext);

  React.useEffect(() => dispatcher({ type: "pe-7s-global" }), []);

  const user = getCookie("user");
  if (!user) {
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
