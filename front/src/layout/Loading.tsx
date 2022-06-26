import React, { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

const override: CSSProperties = {
  background: `yellow`,
  borderRadius: `50%`,
  margin: `50px`,
};

const Loading = () => {
  return (
    <Div>
      <HashLoader size={50} cssOverride={override} />
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Loading;
