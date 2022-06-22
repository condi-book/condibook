import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "./carousel/Carousel";
import Footer from "./Footer";
import Header from "./Header";
import { UserStateContext } from "App";

export interface ContextProps {
  userContext: { user: any };
  handleNavigate: () => void;
}

const Main = () => {
  const userContext: ContextProps["userContext"] = useContext(UserStateContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (userContext.user) navigate("/bookmark");
    else navigate("/login");
  };

  return (
    <Wrap>
      <Header userContext={userContext} handleNavigate={handleNavigate} />
      <Container>
        <header className="part header">
          <div className="container">
            <div>
              <div>
                <div className="caption animate__animated animate__fadeInDown">
                  <h1>
                    <strong>북마크 관리가 쉬워진다</strong>
                  </h1>
                  <p>
                    북마크,
                    <br />
                    이제 스마트하게 저장하세요
                  </p>
                  <button className="custom-btn btn-3" onClick={handleNavigate}>
                    <span>무료로 시작하기</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="main-image">
              <img src="/static/img/main.gif" alt="대표이미지" />
            </div> */}
          </div>
        </header>
        <div className="part even review">
          <div className="title">사용자 후기</div>
          <div className="carousel-wrap">
            <Carousel />
          </div>
        </div>
        <section className="part" id="service-info">
          <div className="container">
            <div>
              <img alt="소개이미지" />
            </div>
            <div className="content">
              <h6>서비스 소개 1</h6>
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt ab, eius perspiciatis quae velit minima. Officiis magni
                minus labore, totam, neque a non temporibus in consequuntur
                sapiente obcaecati quasi provident.
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt ab, eius perspiciatis quae velit minima. Officiis magni
                minus labore, totam, neque a non temporibus in consequuntur
                sapiente obcaecati quasi provident.
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt ab, eius perspiciatis quae velit minima. Officiis magni
                minus labore, totam, neque a non temporibus in consequuntur
                sapiente obcaecati quasi provident.
              </p>
            </div>
          </div>
        </section>
        <section className="side">
          <h3>나만의 북마크, 정리부터 공유까지</h3>
          <button onClick={handleNavigate}>
            <span>무료로 시작하기</span>
          </button>
        </section>
      </Container>
      <Footer />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  .caption p {
    font-size: 1.2vw;
  }

  .review {
    display: flex;
    flex-direction: column;
    .title {
      margin: 5% 0;
    }
  }

  .carousel-wrap {
    display: flex;
    justify-content: center;
  }

  .header {
    display: flex;
    align-items: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("/static/img/main.gif");
    background-size: 100% 100%;

    .container {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end !important;
      padding-right: 5%;

      .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        outline: none;
      }
      button {
        // background: ${({ theme }) => theme.mainColor};
        // color: white;
        // padding: 3%;
        // font-size: 1.2vw;
      }
      .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-family: "Lato", sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        outline: none;
      }
      .btn-3 {
        background: rgb(0, 172, 238);
        background: ${({ theme }) => theme.mainColor};
        width: 130px;
        height: 40px;
        line-height: 42px;
        padding: 0;
        border: none;
      }
      .btn-3 span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
      }
      .btn-3:before,
      .btn-3:after {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        background: ${({ theme }) => theme.mainColor};
        transition: all 0.3s ease;
      }
      .btn-3:before {
        height: 0%;
        width: 2px;
      }
      .btn-3:after {
        width: 0%;
        height: 2px;
      }
      .btn-3:hover {
        background: rgba(255, 255, 255, 0.5);
        box-shadow: none;
      }
      .btn-3:hover:before {
        height: 100%;
      }
      .btn-3:hover:after {
        width: 100%;
      }
      .btn-3 span:hover {
        background: ${({ theme }) => theme.mainColor};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .btn-3 span:before,
      .btn-3 span:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        background: ${({ theme }) => theme.mainColor};
        transition: all 0.3s ease;
      }
      .btn-3 span:before {
        width: 2px;
        height: 0%;
      }
      .btn-3 span:after {
        width: 0%;
        height: 2px;
      }
      .btn-3 span:hover:before {
        height: 100%;
      }
      .btn-3 span:hover:after {
        width: 100%;
      }
    }
  }

  .main-image {
    width: 50%;
    height: 50%;
    background: ${({ theme }) => theme.mainColor};
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .part {
    height: 100vh;

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
      font-size: 2vw;
      text-align: center;
      padding: 2% 0;
    }
  }

  .side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    background: ${({ theme }) => theme.mainColor};
    color: white;

    h3 {
      margin-bottom: 30px;
    }

    button {
      cursor: pointer;
      background: ${({ theme }) => theme.subBlackColor};
      color: white;
      padding: 1%;

      &:hover {
        border: 1px solid white;
      }
    }
  }
`;

export default Main;
