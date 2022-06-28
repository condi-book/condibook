import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
// import * as Api from "../api";

interface MypageBookmarkCardProps {
  item: {
    id: string;
    image: string;
    title: string;
    bookmarkCount: number;
    favorites: boolean;
    createdAt: string;
  };
  handleRemove: (e: React.MouseEvent, value: any) => void;
}

// 스타일 컴포넌트 프롭 인터페이스
interface StyleProps {
  item: MypageBookmarkCardProps["item"];
  view: boolean;
}

// 북마크 폴더 컴포넌트
const MypageBookmarkCard = ({
  item,
  handleRemove,
}: MypageBookmarkCardProps) => {
  // 즐겨찾기 상태값, 더보기 상태값, 더보기 ref 값
  const [checked, setChecked] = useState<boolean>(item.favorites);
  const [view, setView] = useState<boolean>(false);
  const viewMore: any = useRef([]);

  const navigate = useNavigate();
  // 폴더 디테일 페이지로 이동 함수
  const handleClick = () => navigate(`/${item.title}/${item.id}`);

  const customFetcher = async (url: string) => {
    const response = await fetch(
      `https://rlp-proxy.herokuapp.com/v2?url=${url}`,
    );
    const json = await response.json();
    const data = {
      ...json.metadata,
      title: "",
      description: "",
      siteName: "",
      hostname: "",
    };
    return data;
  };

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

  // 아직 기능 완성 안됨
  const handleFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 즐겨찾기 추가 or 제거
    setChecked((prev) => !prev);
    console.log(checked);
    // Api.put(`folders/${item.id}?mode=favorites`, {})
  };

  // 더보기 상태값 변경 함수
  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView((prev) => !prev);
  };

  return (
    <Div view={view} item={item} onClick={handleClick}>
      <div className="top part">
        <div className="top-container">
          <LinkPreview
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="40%"
            height="70%"
            fetcher={customFetcher}
            descriptionLength={0}
            fallback={<span className="pe-7s-folder"></span>}
            showLoader={false}
          />
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
          <span>{item.bookmarkCount}</span>
        </div>
        <div>
          <span onClick={handleFavorites} className="pe-7s-ribbon"></span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<StyleProps>`
  background-color: white;
  margin: 0.833%;
  padding: 10px;
  width: 15%;
  box-sizing: border-box;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }

  .top-container {
    width: 100%;
    height: 100%;
  }

  .top {
    height: 50%;
  }
  .middle {
    height: 20%;
  }
  .part {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .Container {
      border: none;
    }
    .LowerContainer {
      display: none;
    }
  }
  .Image {
    border-radius: 7px;
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
    margin-left: 12.5%;
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
