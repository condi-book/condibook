import Logout from "auth/Logout";
import React from "react";
import styled from "styled-components";
// import UserDelete from "user/UserDelete";
import { Button } from "user/Profile";

const Config = () => {
  return (
    <Div>
      <div className="config-container">
        {/* <div className="config-btn">
          <UserDelete />
        </div> */}
        <div className="config-btn">
          <Button
            onClick={() =>
              window.open(
                "https://chrome.google.com/webstore/detail/condibook/cgonakfcbbinpfkamomcldbbfmhekdid?hl=ko",
                "_blank",
              )
            }
          >
            크롬 확장 <br />
            프로그램 다운로드
          </Button>
        </div>
        <div className="config-btn">
          <Logout />
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  position: fixed;
  width: 28vh;
  height: 20vh;
  // border: ${({ theme }) => theme.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.profileBackground};
  margin-left: 6vw;
  bottom: 7%;
  z-index: 999;
  box-shadow: ${({ theme }) => theme.boxShadow};

  .config-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
    // background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
  .config-btn {
    // border-bottom: 1px solid black;
    font-size: 1vw;
    width: 80%;
    text-align: center;
  }
`;

export default Config;
