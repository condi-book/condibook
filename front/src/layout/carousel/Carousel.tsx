import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Arrow from "./Arrow";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: "custom-dots",
    nextArrow: <Arrow />,
  };
  return (
    <Section className="page-carousel">
      <Slider {...settings}>
        <div className="review-box">
          <img alt="말풍선" />
          <div>
            서비스 너무 좋네요서비스 너무 좋네요서비스 너무 좋네요서비스 너무
            좋네요서비스 너무 좋네요서비스 너무 좋네요서비스 너무 좋네요서비스
            너무 좋네요서비스 너무 좋네요서비스 너무 좋네요서비스 너무
            좋네요서비스 너무 좋네요서비스 너무 좋네요서비스 너무 좋네요
          </div>
          <img alt="프로필 사진" />
          <div>이름</div>
          <div>직업</div>
        </div>
        <div className="review-box"></div>
        <div className="review-box"></div>
        <div className="review-box"></div>
        <div className="review-box"></div>
      </Slider>
    </Section>
  );
};

const Section = styled.section`
  .review-box {
    height: 40vh;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .custom-dots {
    position: absolute;
    bottom: -15px;
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
    width: 40px;
    height: 20px;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
  }

  .custom-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 40px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: black;
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
    color: red;
    content: "o";
  }
`;

export default Carousel;
