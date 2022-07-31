import React from "react";
import styled from "styled-components";
import { Folder } from "./TeamPage";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Modal from "layout/Modal";
import * as Api from "../api";

import { Alert } from "../layout/Alert";
import { AxiosError } from "axios";

interface StyleProps {
  view: boolean;
  folder: Folder;
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
  const viewMore = React.useRef([]);

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
    Api.delete(`folders`, `${value.id}`)
      .then(() => {
        Alert.fire({
          icon: "success",
          title: "폴더 삭제 성공",
        });
        fetchTeamFolderData();
      })
      .catch((err) => {
        const error = err as AxiosError;
        Alert.fire({
          icon: "error",
          title: "삭제 실패 " + error.response?.data,
        });
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
      <Div view={view} onClick={onClick} folder={folder}>
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
          <span>
            {folder.title.length >= 10
              ? `${folder.title.substr(0, 10)}...`
              : folder.title}
          </span>
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
          })
            .then((res) => {
              fetchTeamFolderData();
              console.log(res.data);
            })
            .catch((error) => {
              const err = error as AxiosError;
              Alert.fire({
                icon: "error",
                title: "수정 실패 " + err.response?.data,
              });
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
  color: ${({ folder }) =>
    folder.favorites === true ? "#FEE500" : "#c0c0c0"}; 
  font-size: 1.7vw;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
}

.dropdown {
  display: ${({ view }) => (view ? "block" : "none")};
  position: absolute;
  margin-left: 7%;
  background-color: #f9f9f9;
  min-width: 60px;
  padding: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  list-style-type: none;

  li {
    font-weight: normal;
    text-align: center;
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
