import React from "react";
import styled from "styled-components";
const Main = () => {
  return (
    <Div>
      <div>서비스 대표적으로 소개 및 시작하기 버튼</div>
      <div>사용자 후기</div>
      <div>서비스 특징 1</div>
      <div>서비스 특징 2</div>
      <div>서비스 특징 3</div>
    </Div>
  );
};

const Div = styled.div`
  border: 2px solid black;
  width: 100vw;
  // display: flex;
  // flex-direction: column;

  div {
    height: 50vh;
  }
`;

export default Main;
