import React, { useState } from "react";
import styled from "styled-components";
import MypageBookmarkDetail from "./MyPageBookMarkDetail";
import { MypageBookmarkProps } from "./MyPageBookMark";
import { MypageProps } from "./MyPage";

const MypageBookmarkLayout = ({ data, title }: MypageBookmarkProps) => {
  const [show, setShow] = useState<MypageProps["show"]>(false);
  return (
    <Div>
      <div>
        <h3>{title}</h3>
      </div>
      <div className="favorites">
        <div className="favorites-list">
          {data.map((item, index) => (
            <MypageBookmarkDetail {...item} key={index} />
          ))}
          {show && <>더보기 내용 부분</>}
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

export default MypageBookmarkLayout;
