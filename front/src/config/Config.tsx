import SideBar from "layout/SideBar";
import React, { useContext } from "react";
import styled from "styled-components";
import { KeyboardContext } from "App";
import ConfigNavbar from "./ConfigNavBar";

const Config = () => {
  const keyboardContext: any = useContext(KeyboardContext);
  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <div className="config-container">
        <ConfigNavbar />
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;
  height: 100vh;

  .config-container {
    margin: auto;
    width: 90vw;
    border: 2px solid red;
    height: 100%;
  }
`;

export default Config;
