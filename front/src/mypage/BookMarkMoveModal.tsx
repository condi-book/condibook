import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "../api";

interface GlobalAddProps {
  open: boolean;
  close: () => void;
  bookmarkId: Number;
  currentFolderTitle: string;
  handleBookMarkChange: (bookmarkId: Number) => void;
}

interface FolderProps {
  folder: {
    id: number;
    title: string;
  };
}

const BookMarkMoveModal = ({
  open,
  close,
  bookmarkId,
  currentFolderTitle,
  handleBookMarkChange,
}: GlobalAddProps) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const folderId = e.target.value;
    console.log(folderId);
    setSelectedFolder(folderId);
  };

  const handleSubmit = () => {
    console.log(selectedFolder);
    Api.put(`bookmarks/${bookmarkId}`, { folder_id: selectedFolder })
      .then(() => {
        alert("북마크 이동 성공");
        handleBookMarkChange(bookmarkId);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  useEffect(() => {
    Api.get(`user/folders`).then((res) => {
      console.log(res.data);
      setSelectedFolder(
        res.data.find((item: any) => item.title === currentFolderTitle).id,
      );
      setFolders(
        res.data.map((folder: FolderProps["folder"]) => ({
          id: folder.id,
          title: folder.title,
        })),
      );
    });
    console.log("이동할 북마크", bookmarkId);
  }, []);

  return (
    <Div>
      <div className={open ? "bg" : ""}></div>
      <div className={open ? "modal active" : "modal"}>
        {open && (
          <div className="area">
            <div className="close">
              <div className="move-title">링크 이동하기</div>
              <span
                onClick={() => {
                  close();
                }}
                className="pe-7s-close"
              ></span>
            </div>
            <div className="link-box">
              <Folder>
                <div style={{ fontWeight: "bold" }}>폴더 위치 *</div>
                <select
                  defaultValue={selectedFolder}
                  onChange={handleFolderChange}
                >
                  {folders?.map((folder: FolderProps["folder"]) => (
                    <option key={`folder-${folder.id}`} value={folder.id}>
                      {folder.title}
                    </option>
                  ))}
                </select>
              </Folder>
            </div>
            <Button onClick={handleSubmit}>저장하기</Button>
          </div>
        )}
      </div>
    </Div>
  );
};

const Div = styled.div`
  .bg {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;
  }
  .active {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .area {
      background: white;
      width: 30%;
      height: 40%;
      border-radius: 10px;
    }

    .close {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      text-align: right;
      font-size: 3vw;
      font-weight: bold;
      height: 20%;

      .move-title {
        margin-left: 1vw;
        font-size: 2vw;
      }

      span:hover {
        color: gray;
        cursor: pointer;
      }
    }

    .link-box {
      height: 70%;
      display: flex;
      justify-content: space-around;
      align-items: space-around;
      flex-direction: column;
      background: ${({ theme }) => theme.lightMainColor};
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    button {
      box-sizing: border-box;
      height: 20%;
      border-radius: 0;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      border: none;
      width: 100%;
    }
  }
  .copy-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;

    .link-input {
      width: 60%;
    }
    .push-btn {
      width: 20%;
      padding: 5px 0;
      border-radius: 5px;
      height: 100%;
      background: ${({ theme }) => theme.profileBackground};
      color: white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      &:disabled {
        background: ${({ theme }) => theme.subGrayColor};
        color: black;
        opacity: 0.2;
      }
    }
  }
`;

const Folder = styled.div`
  margin: 0 20px 10px 20px;
  display: flex;
  justify-content: center;

  select {
    width: 40%;
    margin-left: 1.5vw;
  }
  input {
    width: 60%;
    border: ${({ theme }) => theme.border};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.profileBackground};
  color: white;
  font-weight: bold;

  &:disabled {
    background: ${({ theme }) => theme.subGrayColor};
    color: black;
    opacity: 0.2;
  }
`;
export default BookMarkMoveModal;
