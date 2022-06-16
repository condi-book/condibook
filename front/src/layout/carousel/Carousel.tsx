import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { NextArrow, PrevArrow } from "./Arrow";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: "custom-dots",
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
      review: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
      dolorum odit, fugiat in odio eos dignissimos tempora quas explicabo
      obcaecati quo assumenda, nulla facere, ab ipsa quasi saepe quia
      laudantium!`,
      name: `username`,
      job: `freelancer`,
    },
    {
      review: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
  dolorum odit, fugiat in odio eos dignissimos tempora quas explicabo
  obcaecati quo assumenda, nulla facere, ab ipsa quasi saepe quia
  laudantium!`,
      name: `username`,
      job: `freelancer`,
    },
    {
      review: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
dolorum odit, fugiat in odio eos dignissimos tempora quas explicabo
obcaecati quo assumenda, nulla facere, ab ipsa quasi saepe quia
laudantium!`,
      name: `username`,
      job: `freelancer`,
    },
    {
      review: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
dolorum odit, fugiat in odio eos dignissimos tempora quas explicabo
obcaecati quo assumenda, nulla facere, ab ipsa quasi saepe quia
laudantium!`,
      name: `username`,
      job: `freelancer`,
    },
    {
      review: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
dolorum odit, fugiat in odio eos dignissimos tempora quas explicabo
obcaecati quo assumenda, nulla facere, ab ipsa quasi saepe quia
laudantium!`,
      name: `username`,
      job: `freelancer`,
    },
  ];
  return (
    <Section className="page-carousel">
      <Slider {...settings}>
        {data.map((value: reviewer, index: number) => (
          <div className="item" key={`carousel-${index}`}>
            <img src="static/img/review.png" alt="말풍선" />
            <div>{value.review}</div>

            <div className="info">
              <span className="color-font pe-7s-user"></span>
              <h6>{value.name}</h6>
              <span>{value.job}</span>
            </div>
          </div>
        ))}
      </Slider>
    </Section>
  );
};

const Section = styled.section`
  .slick-slider {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item {
    height: 60vh;
    width: 80% !important;
    padding: 10px 20px;
    margin: auto;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;

    div:first-of-type {
      width: 70%;
    }

    .info {
      margin-top: 30px;
      text-align: center;

      h6 {
        font-weight: 700;
        margin-bottom: 10px;
        font-size: 20px;
        margin-top: 20px;
      }
    }

    .color-font {
      background: ${({ theme }) => theme.mainColor};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 60px;
    }

    img {
      width: 50px;
      margin-bottom: 50px;
    }
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
