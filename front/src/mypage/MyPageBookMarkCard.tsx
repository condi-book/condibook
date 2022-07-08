import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { BookmarkItem } from "./MyPageBookMark";
import Modal from "layout/Modal";
import * as Api from "../api";
import { Alert, warningAlert } from "layout/Alert";

interface MypageBookmarkCardProps {
  item: {
    id: string;
    image: string;
    title: string;
    bookmark_count: number;
    favorites: boolean;
    createdAt: string;
    first_bookmark_url: string;
  };
  handleRemove: (e: React.MouseEvent, value: any) => void;
  handleFavorites: (
    e: React.MouseEvent,
    item: MypageBookmarkCardProps["item"],
  ) => void;
  handleFolderEdit: (value: any, title: string) => void;
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
  handleFavorites,
  handleFolderEdit,
}: MypageBookmarkCardProps) => {
  // 더보기 상태값, 더보기 ref 값
  const [view, setView] = useState<boolean>(false);
  const viewMore: any = useRef([]);

  const navigate = useNavigate();
  // 폴더 디테일 페이지로 이동 함수
  const handleClick = () => navigate(`/bookmark/${item.id}`);

  const customFetcher = async (url: string) => {
    if (url) {
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
    }
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

  // 더보기 상태값 변경 함수
  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView((prev) => !prev);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(item.title);

  //폴더 이름 변경
  const handleEdit = (e: React.MouseEvent, item: BookmarkItem) => {
    e.stopPropagation();
    setTitle(item.title);
    setEdit(true);
  };

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  // 폴더 삭제 로직
  const folderDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    warningAlert(e, "해당 폴더를 삭제하시겠습니까?", async () => {
      await handleRemove(e, item);
      await setView(false);
      await Alert.fire({
        icon: "success",
        title: "폴더 삭제 성공",
      });
    });
  };

  return (
    <>
      <Div view={view} item={item} onClick={handleClick}>
        <div className="top part">
          <div className="top-container" onClick={(e) => e.stopPropagation()}>
            <LinkPreview
              url={item.first_bookmark_url}
              width="35%"
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
              onClick={(e) => {
                handleEdit(e, item);
                setView(false);
              }}
            >
              수정
            </li>
            <li ref={(el) => (viewMore.current[2] = el)} onClick={folderDelete}>
              삭제
            </li>
          </ul>
        </div>
        <div className="middle part">
          <span>
            {item.title.length >= 10
              ? `${item.title.substr(0, 10)}...`
              : item.title}
          </span>
        </div>
        <div className="bottom part">
          <div>
            <span className="pe-7s-link"></span>
            <span id="number">{item.bookmark_count}</span>
          </div>
          <div>
            <span
              onClick={(e) => {
                handleFavorites(e, item);
              }}
              className="material-symbols-outlined"
            >
              {item.favorites ? "star" : "grade"}
            </span>
          </div>
        </div>
      </Div>
      <Modal
        handleChange={handleChange}
        newLink={title}
        open={edit}
        close={() => setEdit(false)}
        title="폴더 이름 변경"
        handleFolderEdit={() => {
          handleFolderEdit(item.id, title);
          Api.put(`folders/${item.id}`, {
            title: title,
          }).then((res) => {
            console.log(res.data);
          });
        }}
      />
    </>
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
  border-radius: 7px;
  transition: box-shadow 0.1s linear;
  border: ${({ theme }) => theme.border};
  box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
    
  }

  .top-container {
    width: 100%;
    height: 100%;
  }

  .top {
    height: 40%;
  }
  .middle {
    height: 20%;
    span {
      font-size: 1.1vw;
    }
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
    padding: 0px 5px 5px 5px;
    margin: 5px 0 0 0;
    font-size: 1.5vw;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  .material-symbols-outlined {
    color: ${({ item }) => (item.favorites === true ? "#FEE500" : "#c0c0c0")}; 
    font-size: 1.7vw;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  .dropdown {
    display: ${({ view }) => (view ? "block" : "none")};
    position: absolute;
    margin-left: 11%;
    background-color: #f9f9f9;
    min-width: 60px;
    padding: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    list-style-type: none;

    li {
      font-weight: normal;
      text-align: center;
      font-size: 1vw;
    }
    li:hover {
      background: ${({ theme }) => theme.profileBackground};
      color: white;
      cursor: pointer;
    }
  }

  .pe-7s-folder {
    margin; auto;
    font-size: 3vw;
    background: ${({ theme }) => theme.mainColor};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    
  }
  .pe-7s-link {
    margin-right: 3px;
    font-size: 1.3vw;
  }
  #number {
    font-size: 1.1vw;
  }
`;

export default MypageBookmarkCard;
