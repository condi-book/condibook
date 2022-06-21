import React from "react";
import styled from "styled-components";

const ConfigNavbar = (): React.ReactElement => {
  return (
    <Div className="container">
      <div>
        <div className="nav-bar">
          <span>계정</span>
          <span>사용방법</span>
          <span>About 컨디북</span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;

  .nav-bar {
    border 1px solid rgba(76, 76, 76, 0.1);
    border-radius: 20px;
    display: flex;
    width: 100%;
    

    span {
      padding: 15px 0;
      flex: auto;
      text-align: center;
      font-size: 25px;
      font-weight: 600;
      transition: all 0.4s;
      cursor: pointer;
    }
  }
`;

export default ConfigNavbar;
