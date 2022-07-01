import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { NextArrow, PrevArrow } from "./Arrow";

const Carousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // dotsClass: "custom-dots",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  type reviewer = {
    name: string;
    review: string;
    job: string;
  };

  const data = [
    {
      review: `유저의 입장에서 한번 더 생각하는, 디테일한 부분까지 놓치고 싶지 않은 프론트엔드 개발자 강주희입니다`,
      name: `강주희`,
      job: `프론트엔드`,
    },
    {
      review: `화면속으로 들어갈듯한 집중과 한번 잡기 시작한 버그는 끝을 봐야하는 끈기를 가진 프론트엔드 개발자 김하영입니다`,
      name: `김하영`,
      job: `프론트엔드`,
    },
    {
      review: `호기심 많은 개발자입니다`,
      name: `서형준`,
      job: `인공지능`,
    },
    {
      review: `같이 일하고 싶은 개발자가 되고 싶은 엄혜진입니다. 이 서비스가 정보홍수 속 여러분의 치트키가 되길 바랍니다!`,
      name: `엄혜진`,
      job: `백엔드`,
    },
    {
      review: `친해지고 싶은 개발자를 목표로 공부하고있습니다.
      함께 협업하면 재미있고 유익한 사람으로 보여질 수 있도록 노력하겠습니다!!`,
      name: `한우성`,
      job: `백엔드`,
    },
  ];
  return (
    <Section className="page-carousel">
      <Slider {...settings}>
        {data.map((value: reviewer, index: number) => (
          <div className="item" key={`carousel-${index}`}>
            <img src="static/img/review.png" alt="말풍선" />
            <Content>
              <div>{value.review}</div>
            </Content>

            <div className="info">
              <span className="color-font pe-7s-user"></span>
              <h6>{value.name}</h6>
              <span id="job">{value.job}</span>
            </div>
          </div>
        ))}
      </Slider>
    </Section>
  );
};

const Section = styled.section`
  height: 80%;
  width: 80%;
  .slick-slider {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item {
    width: 80% !important;
    padding: 1% 2%;
    margin: auto;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;

    div:first-of-type {
      width: 90%;
      font-size: 1vw;
    }

    .info {
      margin-top: 15%;
      text-align: center;
      padding-bottom: 5%;

      h6 {
        font-weight: 700;
        margin-bottom: 1%;
        font-size: 1.2vw;
        margin-top: 2%;
      }
      #job {
        font-size: 1vw;
      }
    }

    .color-font {
      background: ${({ theme }) => theme.mainColor};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3vw;
    }

    img {
      width: 16%;
      margin-top: 10%;
      margin-bottom: 15%;
    }
  }
  .custom-dots {
    position: absolute;
    bottom: -10%;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .custom-dots li {
    position: relative;
    display: inline-block;
    width: 2vw;
    height: 1vw;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
  }

  .custom-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 2vw;
    height: 1vw;
    padding: 5px;
    cursor: pointer;
    color: ${({ theme }) => theme.subBlackColor};
    border: 0;
    outline: none;
  }

  .custom-dots li button:before {
    font-family: "slick";
    font-size: 2rem;
    line-height: 20px;
    position: absolute;
    top: 10px;
    left: 20px;
    width: 20px;
    height: 20px;
    content: "o";
    text-align: center;
    opacity: 0.9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .custom-dots li.slick-active button:before {
    opacity: 1;
    color: ${({ theme }) => theme.subRedColor};
    content: "o";
  }
`;

const Content = styled.div`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  div {
    width: 80px;
  }
`;

export default Carousel;
