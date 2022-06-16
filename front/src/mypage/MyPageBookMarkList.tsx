import React, { useState } from "react";
import styled from "styled-components";
import MypageBookmarkCard from "./MyPageBookMarkCard";
import { MypageBookmarkProps } from "./MyPageBookMark";
import { MypageProps } from "./MyPage";
import Modal from "../layout/Modal";

const MypageBookmarkList = ({ data, title }: MypageBookmarkProps) => {
  const [show, setShow] = useState<MypageProps["show"]>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");

  const refinedData = () => {
    const copied = Array.from(data);
    let firstCopied = [];
    if (copied.length > 6 && title === "즐겨찾기") {
      firstCopied = copied.splice(0, 6);
    } else if (copied.length > 5 && title === "전체보기") {
      firstCopied = copied.splice(0, 5);
    } else {
      firstCopied = copied;
    }
    return { firstCopied, copied };
  };

  const { firstCopied, copied } = refinedData();

  const handleClick = () => {
    setModalShow((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  return (
    <Div>
      <div>
        <h3>{title}</h3>
      </div>
      <div className="favorites">
        <div className="favorites-list">
          {title === "전체보기" && (
            <div className="create-card" onClick={handleClick}>
              <span className="pe-7s-plus" />
            </div>
          )}
          {modalShow && (
            <Modal
              handleChange={handleChange}
              newLink={folderName}
              open={modalShow}
              close={handleClick}
              title={title}
            />
          )}
          {firstCopied.map((item, index) => (
            <MypageBookmarkCard {...item} key={index} />
          ))}
          {show &&
            copied !== firstCopied &&
            copied.map((item, index) => (
              <MypageBookmarkCard {...item} key={index} />
            ))}
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
  .create-card {
    border: 2px solid black;
    margin: 0.833%;
    padding: 10px;
    width: 15%;
    box-sizing: border-box;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    .pe-7s-plus {
      font-size: 3rem;
    }
  }
`;

export default MypageBookmarkList;
