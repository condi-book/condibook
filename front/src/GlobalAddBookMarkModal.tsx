import React, { useState } from "react";
import styled from "styled-components";
import * as Api from "./api";
import { Alert, errorAlert } from "layout/Alert";

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
  // const [inputShow, setInputShow] = useState(false);
  const [data, setData] = useState<any>({});
  const [folder, setFolder] = useState("");
  const [detailShow, setDetailShow] = useState(false);
  const [folderInputShow, setFolderInputShow] = useState(false);
  const [folderInput, setFolderInput] = useState("");

  //링크 전달 버튼 state 값
  const [click, setClick] = useState(false);

  const handleInfo = () => {
    if (link === "") alert("링크를 입력해주세요");
    Api.post("websites", { url: link })
      .then((res) => {
        console.log(res.data);
        const copied = res.data;
        copied.folders.push({ title: "직접입력", id: 0 });
        const copiedList = copied.folders.map((item: any) => item.title);
        console.log("copiedlist", copiedList);
        if (copiedList.includes(copied.category.category)) {
          setFolder(copied.category.category);
          setData(copied);
          setClick(true);
          setDetailShow(true);
        } else {
          copied.folders.unshift({
            title: res.data.category.category,
            id: null,
          });
          setData(copied);
          setFolder(copied.category.category);
          setClick(true);
          setDetailShow(true);
        }
      })
      .catch((err) => {
        if (err.response.data === "url is not valid") {
          errorAlert("잘못된 URL입니다.");
        }
      });
  };

  // 제출 이벤트
  const handleSubmit = () => {
    const folderId = data.folders.find(
      (f: FolderProps["folder"]) => f.title === folder,
    ).id;
    if (folderInput) {
      Api.post("bookmarks", {
        folder_name: folderInput,
        website_id: data.website.id,
      })

        .then(() => {
          Alert.fire({
            icon: "success",
            title: "링크를 저장했습니다.",
          });
          close();
          window.location.reload();
        })
        .catch((err) => errorAlert(err.response.data));
    } else if (folderId !== null) {
      Api.post(`bookmarks`, {
        folder_id: data.folders.find(
          (f: FolderProps["folder"]) => f.title === folder,
        ).id,
        website_id: data.website.id,
      })
        .then(() => {
          Alert.fire({
            icon: "success",
            title: "링크를 저장했습니다.",
          });
          close();
        })
        .catch((err) => errorAlert(err.response.data));
    } else if (folderId === null) {
      Api.post(`bookmarks`, {
        folder_name: folder,
        website_id: data.website.id,
      })
        .then(() => {
          Alert.fire({
            icon: "success",
            title: "링크를 저장했습니다.",
          });
          close();
          window.location.reload();
        })
        .catch((err) => errorAlert(err.response.data));
    } else {
      errorAlert("폴더를 선택해주세요");
    }
  };

  // useEffect(() => {
  //   navigator.clipboard
  //     .readText()
  //     .then((text) => {
  //       console.log("Pasted content: ", text);
  //       if (text.startsWith("http")) {
  //         setLink(text);
  //       } else {
  //         setInputShow(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setInputShow(true);
  //     });
  // }, []);

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
              <div className="copy-link">
                {!click ? (
                  <InputBox
                    className={click && " animate__animated animate__fadeOut"}
                  >
                    <input
                      className="link-input"
                      type="text"
                      onChange={handleChange}
                      value={link}
                      placeholder="링크를 입력해주세요"
                    ></input>
                    <button
                      className="push-btn"
                      disabled={link ? false : true}
                      onClick={handleInfo}
                    >
                      확인
                    </button>
                  </InputBox>
                ) : (
                  <div
                    className={click && " animate__animated animate__fadeIn"}
                  >
                    <LinkConfirm>
                      <div className="link-section">
                        <div className="link-container">
                          <div>
                            <img
                              width="60px"
                              src="/static/img/site-image.svg"
                              alt="site-image"
                            />
                          </div>
                          <div className="link-box2">
                            <div id="link-title">
                              {data?.website?.meta_title?.length >= 30
                                ? `${data?.website?.meta_title?.substring(
                                    0,
                                    30,
                                  )}...`
                                : data?.website?.meta_title}
                            </div>
                            <div id="link-url">
                              {data?.website?.url?.length >= 25
                                ? `${data?.website?.url?.substring(0, 25)}...`
                                : data?.website?.url}
                            </div>
                          </div>
                        </div>
                      </div>
                    </LinkConfirm>
                    <div id="confirm-folder">
                      <div id="title">* AI 추천 폴더 *</div>
                      <div id="category">{data?.category?.category}</div>
                    </div>
                  </div>
                )}
              </div>
              {/* // ) : (
              //   <div className="copy-link" onClick={handleInfo}>
              //     <span className="pe-7s-link"></span>
              //     <div>
              //       <div>복사한 링크 붙여넣기</div>
              //       <div>
              //         {link.length >= 20 ? `${link.substring(0, 20)}...` : link}
              //       </div>
              //     </div>
              //   </div>
              // )} */}
              {detailShow && (
                <Folder>
                  <div style={{ fontWeight: "bold" }}>저장 폴더 *</div>
                  <select defaultValue={folder} onChange={handleFolderChange}>
                    {data?.folders.map((folder: FolderProps["folder"]) => (
                      <option key={`folder-${folder.id}`} value={folder.title}>
                        {folder.title}
                      </option>
                    ))}
                  </select>
                  <input
                    disabled={!folderInputShow && true}
                    placeholder={
                      folderInputShow ? "새 폴더명을 입력하세요" : ""
                    }
                    value={folderInput}
                    onChange={(e) => setFolderInput(e.target.value)}
                  ></input>
                </Folder>
              )}
            </div>

            <Button
              disabled={
                ((folder === "직접입력" && !folderInput) || !click) && true
              }
              onClick={handleSubmit}
            >
              저장하기
            </Button>
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
      width: 300px;
      height: 400px;
      border-radius: 10px;
    }
    .close {
      text-align: right;
      font-size: 50px;
      font-weight: bold;
      height: 15%;

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
      height: 15%;
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
      border-bottom-left-radius:0;

      &:disabled {
        background: ${({ theme }) => theme.subGrayColor};
    color: black;
    opacity: 0.2;
      }
    }
  }

  #confirm-folder {
    display: flex;
    flex-direction: column;
    align-items: center;
    #title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    #category {
      font-weight: bold;
      font-size: 20px;
      text-align: center;

      color: white;
      background: linear-gradient(
        135deg,
        #12c2e9 19.08%,
        #c471ed 49.78%,
        #f64f59 78.71%
      );
      border-radius: 10px;
      width: 60%;
      padding: 5px;
    }

    
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    border: ${({ theme }) => theme.border};
    padding: 5px;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    padding: 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const LinkConfirm = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;

  .link-section {
    width: 100%;
    background: white;
    padding: 10px 15px;
    border-radius: 10px;
    .link-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .link-box2 {
        width: 60%;

        #link-title {
          font-weight: 600;
        }
      }
    }
  }
  #link-url {
    font-size: 12px;
  }
`;

const Folder = styled.div`
  margin: 0 20px 10px 20px;

  select {
    width: 40%;
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
export default GlobalAddBookMarkModal;
