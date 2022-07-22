import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "./carousel/Carousel";
import Footer from "./Footer";
import Header from "./Header";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { getCookie } from "auth/util/cookie";

export interface ContextProps {
  userContext?: { user: any };
  handleNavigate: () => void;
}

const Main = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (getCookie("userToken")) navigate("/bookmark");
    else navigate("/login");
  };

  return (
    <Wrap>
      <Header handleNavigate={handleNavigate} />
      <Container>
        <header className="part header">
          <div className="container">
            <div>
              <div>
                <div className="caption animate__animated animate__fadeInDown">
                  <AnimationOnScroll animateIn="animate__fadeIn">
                    <h1>
                      <strong>북마크 관리가 쉬워진다</strong>
                    </h1>
                    <p>
                      북마크,
                      <br />
                      이제 스마트하게 저장하세요
                    </p>
                    <button
                      className="custom-btn btn-3"
                      onClick={handleNavigate}
                    >
                      <span>무료로 시작하기</span>
                    </button>
                  </AnimationOnScroll>
                </div>
              </div>
            </div>
            {/* <div className="main-image">
              <img src="/static/img/main.gif" alt="대표이미지" />
            </div> */}
          </div>
        </header>
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className="part even review">
            <h6>OUR TEAM</h6>
            <div className="title">An original team of developers</div>
            <div className="carousel-wrap">
              <Carousel />
            </div>
          </div>
        </AnimationOnScroll>

        <section className="part" id="service-info">
          <AnimationOnScroll animateIn="animate__fadeIn" className="animation">
            <div className="container">
              <div>
                <Img src="/static/img/chrome_extension.png" alt="소개이미지" />
              </div>

              <div className="content">
                <H6>서비스 소개 1</H6>
                <H2>크롬 익스텐션 기능</H2>
                <P>
                  저희 CondiBook 서비스는 Chrome Extension을 통해서 사용자들이
                  좀 더 쉽고 빠르게 북마크를 관리할 수 있는 환경을 제공합니다
                </P>
              </div>
            </div>
          </AnimationOnScroll>
        </section>

        <section className="part even">
          <AnimationOnScroll animateIn="animate__fadeIn" className="animation">
            <div className="container">
              <div className="content">
                <H6>서비스 소개 2</H6>
                <H2>북마크 공유 기능</H2>
                <P>
                  그룹 북마크 및 커뮤니티 게시판을 통해 다양한 사용자와 지식 및
                  북마크를 공유할 수 있습니다
                </P>
              </div>
              <div>
                <Img src="/static/img/bookmark_sharing.png" alt="소개이미지" />
              </div>
            </div>
          </AnimationOnScroll>
        </section>

        <section className="part">
          <AnimationOnScroll animateIn="animate__fadeIn" className="animation">
            <div className="container">
              <div>
                <Img src="/static/img/keyword_ai.jpg" alt="소개이미지" />
              </div>
              <div className="content">
                <H6>서비스 소개 3</H6>
                <H2>AI 추천 북마크 자동 저장 기능</H2>
                <P>
                  간단한 클릭 한 번으로, AI가 제공하는 키워드에 맟춰 북마크를
                  저장 할 수 있습니다
                </P>
              </div>
            </div>
          </AnimationOnScroll>
        </section>

        <AnimationOnScroll animateIn="animate__fadeIn">
          <section className="side">
            <h3>나만의 북마크, 정리부터 공유까지</h3>
            <Button onClick={handleNavigate}>
              <span>무료로 시작하기</span>
            </Button>
          </section>
        </AnimationOnScroll>
      </Container>
      <Footer />
    </Wrap>
  );
};

const P = styled.p`
  font-size: 1.1vw;
`;

const H6 = styled.h6`
  font-size: 1vw;
  background: ${({ theme }) => theme.profileBackground};
  color: white;
  font-weight: bold;
  padding: 10px;
  width: fit-content;
  border-radius: 5px;
`;

const H2 = styled.h2`
  font-size: 1.5vw;
  font-weight: bold;
`;

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
    justify-content: center;

    h6 {
      text-align: center;
      letter-spacing: 0.5vw;
      font-size: 0.8vw;

    }
    }
    .title {
      margin-bottom: 5%;

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

      button {
        // background: ${({ theme }) => theme.mainColor};
        // color: white;
        // padding: 3%;
        // font-size: 1.2vw;
      }
      .custom-btn {
        width: 40%;
        height: 15%;
        color: #fff;
        border-radius: 5px;
        // padding: 1% 2.5%;
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
        width: 40%;
        height: 15%;
        padding: 0;
        border: none;
      }
      .btn-3 span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 1vw;
        padding: 5%;
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
        font-weight: bold;
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
    .animation {
      height: 100%;
    }

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
      // padding: 1% 0;
      background: ${({ theme }) => theme.mainColor};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
      font-size: 1.8vw;
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

const Button = styled.div`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.3);
  color: black;
  font-weight: bold;
  padding: 1%;
  border-radius: 30px;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5);

  &:hover {
    background: ${({ theme }) => theme.subBlackColor};
    color: white;
  }
`;

const Img = styled.img`
  width: 35vw;
  padding: 0 2vw;
`;

export default Main;
