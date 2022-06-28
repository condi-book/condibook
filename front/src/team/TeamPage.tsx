import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "../layout/SideBar";
import TeamSidebar from "./TeamSidebar";
import { KeyboardContext } from "../App";

const TeamPage = () => {
  const keyboardContext: any = React.useContext(KeyboardContext);
  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <TeamSidebar />
      <div className="team-container">
        <Outlet />
      </div>
    </Div>
  );
};

export default TeamPage;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;
  height: 100vh;
  height: auto;

  .team-container {
    display: flex;
    margin: auto;
    width: 90vw;
    border: 2px solid red;
    height: 100%;
  }
`;
