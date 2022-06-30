import React from "react";
import styled from "styled-components";
import { Folder } from "./TeamPage";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Modal from "layout/Modal";
import * as Api from "../api";

interface StyleProps {
  view: boolean;
}

const TeamPageFolderCard = ({
  folder,
  onClick,
  fetchTeamFolderData,
}: {
  folder: Folder;
  onClick: () => void;
  fetchTeamFolderData: () => Promise<void>;
}) => {
  const [view, setView] = React.useState<boolean>(false);
  const viewMore: any = React.useRef([]);

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

  React.useEffect(() => {
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

  // 폴더 삭제 함수
  const handleRemove = (e: React.MouseEvent, value: any) => {
    e.stopPropagation();
    Api.delete(`folders`, `${value.id}`).then(() => {
      fetchTeamFolderData();
    });
  };

  // 즐겨찾기 상태 변경 함수
  const handleFavorites = (e: React.MouseEvent, folder: Folder) => {
    e.stopPropagation();

    // 즐겨찾기 삭제
    if (folder.favorites) {
      Api.delete(`favorites?object=folder&id=${folder.id}`).then(() => {
        fetchTeamFolderData();
      });
    } else {
      // 즐겨찾기 추가
      Api.post(`favorites?object=folder&id=${folder.id}`, {
        folder_id: folder.id,
      }).then(() => {
        fetchTeamFolderData();
      });
    }
  };

  const [edit, setEdit] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(folder.title);

  //폴더 이름 변경
  const handleEdit = (e: React.MouseEvent, folder: Folder) => {
    e.stopPropagation();
    setTitle(folder.title);
    setEdit(true);
  };

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <Div view={view} onClick={onClick}>
        <div className="top part">
          <div className="top-container">
            <LinkPreview
              url={folder.first_bookmark_url}
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
                handleEdit(e, folder);
                setView(false);
              }}
            >
              수정
            </li>
            <li
              ref={(el) => (viewMore.current[2] = el)}
              onClick={(e) => {
                handleRemove(e, folder);
                setView(false);
              }}
            >
              삭제
            </li>
          </ul>
        </div>
        <div className="middle part">
          <span>{folder.title}</span>
        </div>
        <div className="bottom part">
          <div>
            <span className="pe-7s-link"></span>
            <span>{folder.bookmark_count}</span>
          </div>
          <div>
            <span
              onClick={(e) => {
                handleFavorites(e, folder);
              }}
              className="material-symbols-outlined"
            >
              {folder.favorites ? "star" : "grade"}
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
          Api.put(`folders/${folder.id}`, {
            title: title,
          }).then((res) => {
            fetchTeamFolderData();
            console.log(res.data);
          });
        }}
      />
    </>
  );
};

export default TeamPageFolderCard;

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

  .material-symbols-outlined {
    color: black;

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
  }
`;
