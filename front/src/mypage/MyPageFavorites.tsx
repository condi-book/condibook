import React, { useState } from "react";
import styled from "styled-components";
import MypageFavoritesDetail from "./MyPageFavoritesDetail";
import { MypageProps } from "./MyPage";

const MypageFavorites = () => {
  const [show, setShow] = useState<MypageProps["show"]>(false);
  return (
    <Div className="container">
      <div>
        <h3>즐겨찾기</h3>
      </div>
      <div className="favorites">
        <div className="favorites-list">
          <MypageFavoritesDetail />
          <MypageFavoritesDetail />
          <MypageFavoritesDetail />
          <MypageFavoritesDetail />
          {show && (
            <>
              <MypageFavoritesDetail />
              <MypageFavoritesDetail />
            </>
          )}
        </div>
        <div className="view-more">
          <button onClick={() => setShow((prev) => !prev)}>더보기</button>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  .favorites {
    width: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    border: 2px solid blue;
  }
  .favorites-list {
    border: 2px solid red;
    // width: 97%;
    display: flex;
    flex-wrap: wrap;
    flex-basis: 90%;
  }
  .view-more {
    text-align: center;
  }
`;

export default MypageFavorites;
