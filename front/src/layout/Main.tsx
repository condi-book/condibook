import React from "react";
import styled from "styled-components";
import Carousel from "./carousel/Carousel";

const Main = () => {
  return (
    <Container>
      <div className="part">서비스 대표적으로 소개 및 시작하기 버튼</div>
      <div className="part even ">
        <div className="title">사용자 후기</div>
        <Carousel />
      </div>
      <div className="part">서비스 특징 1</div>
      <div className="part even">서비스 특징 2</div>
      <div className="part">서비스 특징 3</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;

  .part {
    height: 85vh;
  }
  .even {
    background: #f8f9fc;

    .title {
      font-weight: 700;
      font-size: 42px;
      text-align: center;
      padding: 40px 0;
    }
  }
`;

export default Main;
