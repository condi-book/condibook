import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
// import * as Api from "../api";

interface MypageBookmarkCardProps {
  item: {
    id: string;
    image: string;
    title: string;
    link_num: number;
    favorites: boolean;
    createdAt: string;
  };
  handleRemove: (e: React.MouseEvent, value: any) => void;
}

interface StyleProps {
  item: MypageBookmarkCardProps["item"];
  view: boolean;
}

const MypageBookmarkCard = ({
  item,
  handleRemove,
}: MypageBookmarkCardProps) => {
  const [checked, setChecked] = useState<boolean>(item.favorites);
  const navigate = useNavigate();
  const handleClick = () => navigate(`/bookmark/${item.title}`);
  const [view, setView] = useState<boolean>(false);
  const viewMore: any = useRef([]);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  // 드롭다운 외부 클릭 시에도 닫히도록 하는 함수
  const clickOutside = (e: any) => {
    if (view && !viewMore.current.includes(e.target)) {
      setView((prev) => !prev);
    }
  };

  const handleFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 즐겨찾기 추가 or 제거
    setChecked((prev) => !prev);
    console.log(checked);
    // Api.put(`folders/${item.id}?mode=favorites`, {})
  };

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView((prev) => !prev);
  };

  return (
    <Div view={view} item={item} onClick={handleClick}>
      <div className="top part">
        <div>
          <img src={item.image} alt="북마크 이미지"></img>
        </div>
        <div>
          <span onClick={handleViewMore} className="pe-7s-more"></span>
        </div>
        <ul className="dropdown">
          <li
            ref={(el) => (viewMore.current[1] = el)}
            // onClick={() => setEdit(true)}
          >
            수정
          </li>
          <li
            ref={(el) => (viewMore.current[2] = el)}
            onClick={(e) => {
              handleRemove(e, item);
              setView(false);
            }}
          >
            삭제
          </li>
        </ul>
      </div>
      <div className="middle part">
        <span>{item.title}</span>
      </div>
      <div className="bottom part">
        <div>
          <span className="pe-7s-link"></span>
          <span>{item.link_num}</span>
        </div>
        <div>
          <span onClick={handleFavorites} className="pe-7s-ribbon"></span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<StyleProps>`
  border: 2px solid black;
  margin: 0.833%;
  padding: 10px;
  width: 15%;
  box-sizing: border-box;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .part {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .pe-7s-more {
    transform: rotate(90deg);
  }

  .pe-7s-ribbon {
    color: ${({ item }) => (item.favorites === true ? "red" : "black")};

    &:hover {
      font-size: 1.5em;
      cursor: pointer;
      font-weight: bold;
    }
  }

  .dropdown {
    display: ${({ view }) => (view ? "block" : "none")};
    position: absolute;
    margin-left: 13%;
    background-color: #f9f9f9;
    min-width: 60px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    list-style-type: none;

    li {
      font-weight: normal;
      text-align: center;
    }
    li:hover {
      background: black;
      color: white;
      border-radius: 2px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default MypageBookmarkCard;
