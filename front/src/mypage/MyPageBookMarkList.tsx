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
  handleFavorites,
  handleFolderEdit,
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
        <Font>{title}</Font>
      </div>
      <div className="favorites">
        <div className="favorites-list">
          {title === "전체보기" && (
            <div className="create-card" onClick={handleClick}>
              <span className="pe-7s-plus" />
            </div>
          )}
          {title === "즐겨찾기" && firstCopied.length === 0 && (
            <ImgDiv>
              <div id="none-favorites">
                <img src="/static/img/favorites.svg" alt="즐겨찾기" />
                <div> 중요한 북마크는 즐겨찾기로 빨리 찾으세요!</div>
              </div>
            </ImgDiv>
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
              handleFavorites={handleFavorites}
              handleFolderEdit={handleFolderEdit}
            />
          ))}
          {show &&
            copied !== firstCopied &&
            copied.map((item, index) => (
              <MypageBookmarkCard
                item={item}
                key={index}
                handleRemove={handleRemove}
                handleFavorites={handleFavorites}
                handleFolderEdit={handleFolderEdit}
              />
            ))}
        </div>
        <div className="view-more">
          {firstCopied !== copied && (
            <button onClick={() => setShow((prev) => !prev)}>
              {show ? (
                <span className="pe-7s-angle-up"></span>
              ) : (
                <span className="pe-7s-angle-down"></span>
              )}
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
    height: 50%;
    margin-bottom: 20px;
  }
  .favorites-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }
  .view-more {
    margin: auto;

    button {
      background: ${({ theme }) => theme.profileBackground};
      position: relative;
      top: 10px;
      color: white;
      border-radius: 50%;
      padding: 0px;
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: ${({ theme }) => theme.boxShadow};

      &:hover {
        background: black;
      }
      span {
        font-size: 1.5vw;
        margin: 2px;
      }
    }
  }
  .create-card {
    border-radius: 7px;
    background: ${({ theme }) => theme.middleMainColor};
    margin: 0.833%;
    padding: 10px;
    width: 15%;
    box-sizing: border-box;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.1s linear;

    &:hover {
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
    }
    .pe-7s-plus {
      font-size: 3vw;
      color: white;
      font-weight: bold;
    }
  }
  .pe-7s-angle-up,
  .pe-7s-angle-down {
    font-size: 2vw;
    margin: auto;
    font-weight: bold;
  }
`;

const Font = styled.div`
  font-size: 1.5vw;
  font-weight: 600;
  margin-bottom: 0.5vw;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 100%;
  #none-favorites {
    margin: 0.833% 0;
    padding: 10px;
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;

    div {
      padding-top: 10px;
      width: 100%;
      text-align: center;
      font-size: 1vw;
    }
  }
  img {
    width: 11%;
  }
`;

export default MypageBookmarkList;
