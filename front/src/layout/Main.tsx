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
      <section className="part">
        <div className="container">
          <div>
            <img alt="소개이미지" />
          </div>
          <div className="content">
            <h6>서비스 소개 1</h6>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              ab, eius perspiciatis quae velit minima. Officiis magni minus
              labore, totam, neque a non temporibus in consequuntur sapiente
              obcaecati quasi provident.
            </p>
          </div>
        </div>
      </section>
      <section className="part even">
        <div className="container">
          <div className="content">
            <h6>서비스 소개 2</h6>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              ab, eius perspiciatis quae velit minima. Officiis magni minus
              labore, totam, neque a non temporibus in consequuntur sapiente
              obcaecati quasi provident.
            </p>
          </div>
          <div>
            <img alt="소개이미지" />
          </div>
        </div>
      </section>
      <section className="part">
        <div className="container">
          <div>
            <img alt="소개이미지" />
          </div>
          <div className="content">
            <h6>서비스 소개 3</h6>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              ab, eius perspiciatis quae velit minima. Officiis magni minus
              labore, totam, neque a non temporibus in consequuntur sapiente
              obcaecati quasi provident.
            </p>
          </div>
        </div>
      </section>
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

    .container {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .content {
        width: 50%;
      }
    }
  }
  .even {
    background: #f8f9fc;

    .title {
      font-weight: 700;
      font-size: 30px;
      text-align: center;
      padding: 40px 0;
    }
  }
`;

export default Main;
