import React, { useState } from "react";
import styled from "styled-components";
import MypageBookmarkCard from "./MyPageBookMarkCard";
import { MypageBookmarkProps } from "./MyPageBookMark";
import { MypageProps } from "./MyPage";

const MypageBookmarkList = ({ data, title }: MypageBookmarkProps) => {
  const [show, setShow] = useState<MypageProps["show"]>(false);
  return (
    <Div>
      <div>
        <h3>{title}</h3>
      </div>
      <div className="favorites">
        <div className="favorites-list">
          {data.map((item, index) => (
            <MypageBookmarkCard {...item} key={index} />
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
  }
  .favorites-list {
    // border: 2px solid red;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .view-more {
    text-align: center;
  }
`;

export default MypageBookmarkList;
