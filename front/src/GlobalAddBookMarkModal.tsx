import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "./api";

interface GlobalAddProps {
  open: boolean;
  close: () => void;
}

type FolderProps = {
  folder: {
    id: number;
    title: string;
  };
};

const GlobalAddBookMarkModal = ({ open, close }: GlobalAddProps) => {
  const [link, setLink] = useState("");
  const [inputShow, setInputShow] = useState(false);
  const [data, setData] = useState<any>({});
  const [folder, setFolder] = useState("");
  const [detailShow, setDetailShow] = useState(false);
  const [folderInputShow, setFolderInputShow] = useState(false);
  const [folderInput, setFolderInput] = useState("");

  const handleInfo = () => {
    if (link === "") alert("링크를 입력해주세요");
    Api.post("websites", { url: link }).then((res) => {
      console.log(res.data);
      const copied = res.data;
      copied.folders.push({ title: "직접입력", id: 0 });
      setData(copied);
      setFolder(copied.folders[0].title);
      setDetailShow(true);
    });
  };

  // 제출 이벤트
  const handleSubmit = () => {
    if (folderInput) {
      Api.post("bookmarks", {
        folder_name: folderInput,
        website_id: data.website.id,
      })

        .then(() => {
          alert("데이터 전달 성공");
          close();
        })
        .catch(() => alert("실패"));
    } else if (folder) {
      Api.post(`bookmarks`, {
        folder_id: data.folders.find(
          (f: FolderProps["folder"]) => f.title === folder,
        ).id,
        website_id: data.website.id,
      }).then(() => {
        alert("성공");
        close();
      });
    } else {
      alert("선택된 폴더가 없습니다.");
    }
  };

  useEffect(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log("Pasted content: ", text);
        if (text.startsWith("http")) {
          setLink(text);
        } else {
          setInputShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInputShow(true);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLink(e.target.value);

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFolder(e.target.value);
    if (e.target.value === "직접입력") setFolderInputShow((prev) => !prev);
    else setFolderInputShow(false);
  };

  return (
    <Div>
      <div className={open ? "bg" : ""}></div>
      <div className={open ? "modal active" : "modal"}>
        {open && (
          <div className="area">
            <div className="close">
              <span
                onClick={() => {
                  close();
                  setLink("");
                }}
                className="pe-7s-close"
              ></span>
            </div>
            <div className="link-box">
              {inputShow ? (
                <div className="copy-link">
                  <input
                    className="link-input"
                    type="text"
                    onChange={handleChange}
                    value={link}
                    placeholder="링크를 입력해주세요"
                  ></input>
                  <button className="push-btn" onClick={handleInfo}>
                    확인
                  </button>
                </div>
              ) : (
                <div className="copy-link" onClick={handleInfo}>
                  <span className="pe-7s-link"></span>
                  <div>
                    <div>복사한 링크 붙여넣기</div>
                    <div>
                      {link.length >= 20 ? `${link.substring(0, 20)}...` : link}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {detailShow && (
              <div>
                <div>저장 폴더 *</div>
                <select defaultValue={folder} onChange={handleFolderChange}>
                  {data?.folders.map((folder: FolderProps["folder"]) => (
                    <option key={`folder-${folder.id}`} value={folder.title}>
                      {folder.title}
                    </option>
                  ))}
                </select>
                <input
                  disabled={!folderInputShow && true}
                  placeholder={folderInputShow ? "새 폴더명을 입력하세요" : ""}
                  value={folderInput}
                  onChange={(e) => setFolderInput(e.target.value)}
                ></input>
              </div>
            )}

            <button
              disabled={folder === "직접입력" && !folderInput && true}
              onClick={handleSubmit}
            >
              저장하기
            </button>
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
    height: 100vh;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: absolute;
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
      text-align: right;
      font-size: 50px;
      font-weight: bold;
      height: 20%;

      span:hover {
        color: gray;
        cursor: pointer;
      }
    }

    .link-box {
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
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

    .link-input {
      width: 60%;
    }
    .push-btn {
      width: 20%;
    }
  }
`;

export default GlobalAddBookMarkModal;
