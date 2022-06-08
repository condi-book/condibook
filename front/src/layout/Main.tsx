import React from "react";
import styled from "styled-components";
import Carousel from "./carousel/Carousel";

const Main = () => {
  return (
    <Container>
      <div className="part">서비스 대표적으로 소개 및 시작하기 버튼</div>
      <div className="part even ">
        사용자 후기
        <Carousel />
      </div>
      <div className="part">서비스 특징 1</div>
      <div className="part even">서비스 특징 2</div>
      <div className="part">서비스 특징 3</div>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid black;
  width: 100vw;

  .part {
    height: 70vh;
    border: 2px solid black;
  }
  .even {
    background: #f8f9fc;
  }
`;

export default Main;
