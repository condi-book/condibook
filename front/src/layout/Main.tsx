import React from "react";
import styled from "styled-components";
import Carousel from "./carousel/Carousel";

const Main = () => {
  return (
    <Container>
      <header className="part header">
        <div className="container">
          <div>
            <div>
              <div className="caption">
                <h1>북마크 관리가 쉬워진다</h1>
                <p>
                  북마크,
                  <br />
                  이제 스마트하게 저장하세요
                </p>
                <button>무료로 시작하기</button>
              </div>
            </div>
          </div>
          <div>
            <img alt="대표이미지" />
          </div>
        </div>
      </header>
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

  .header {
    display: flex;
    align-items: center;

    .container {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      button {
        background: ${({ theme }) => theme.mainColor};
        color: white;
      }
    }
  }
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
