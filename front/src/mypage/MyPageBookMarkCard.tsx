import React from "react";
import styled from "styled-components";

interface MypageBookmarkCardProps {
  item: {
    image: string;
    group: string;
    link_num: number;
    favorite: boolean;
  };
}

const MypageBookmarkDetail = (item: MypageBookmarkCardProps["item"]) => {
  return (
    <Div {...item}>
      <div className="top part">
        <div>
          <img src={item.image} alt="북마크 이미지"></img>
        </div>
        <div>
          <span className="pe-7s-more"></span>
        </div>
      </div>
      <div className="middle part">
        <span>{item.group}</span>
      </div>
      <div className="bottom part">
        <div>
          <span className="pe-7s-link"></span>
          <span>{item.link_num}</span>
        </div>
        <div>
          <span className="pe-7s-ribbon"></span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  border: 2px solid black;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .part {
    width: 15vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .pe-7s-more {
    transform: rotate(90deg);
  }

  .pe-7s-ribbon {
    color: ${(item: MypageBookmarkCardProps["item"]) =>
      item.favorite === true ? "red" : "black"};
  }
`;

export default MypageBookmarkDetail;
