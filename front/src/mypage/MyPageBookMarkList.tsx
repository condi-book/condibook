import React, { useState } from "react";
import styled from "styled-components";
import MypageBookmarkCard from "./MyPageBookMarkCard";
import { MypageBookmarkProps } from "./MyPageBookMark";
import { MypageProps } from "./MyPage";
import Modal from "../layout/Modal";

const MypageBookmarkList = ({
  folderData,
  title,
  handleRemove,
  handlePushData,
}: MypageBookmarkProps) => {
  const [show, setShow] = useState<MypageProps["show"]>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");

  const refinedData = () => {
    const copied = Array.from(folderData);
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
    setFolderName("");
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
              handlePushData={handlePushData}
            />
          )}
          {firstCopied.map((item, index) => (
            <MypageBookmarkCard
              item={item}
              key={index}
              handleRemove={handleRemove}
            />
          ))}
          {show &&
            copied !== firstCopied &&
            copied.map((item, index) => (
              <MypageBookmarkCard
                item={item}
                key={index}
                handleRemove={handleRemove}
              />
            ))}
        </div>
        <div className="view-more">
          {firstCopied !== copied && (
            <button onClick={() => setShow((prev) => !prev)}>
              {show ? "숨기기" : "더보기"}
            </button>
          )}
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
    background: #f5f5f5;
    border-radius: 7px;
  }
  .favorites-list {
    // border: 2px solid red;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .view-more {
    text-align: center;

    button {
      background: black;
      color: white;

      &:hover {
        background: white;
        color: black;
      }
    }
  }
  .create-card {
    border-radius: 7px;
    background: white;
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
