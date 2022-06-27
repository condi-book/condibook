import React from "react";
import styled from "styled-components";
import * as Api from "../api";
import { useParams } from "react-router-dom";

interface props {
  open: boolean;
  close: () => void;
  newLink: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  title?: string;
  handlePushData?: (data: any) => void;
  handleFolderEdit?: () => void;
}
const Modal = ({
  open,
  close,
  newLink,
  handleChange,
  title,
  handlePushData,
  handleFolderEdit,
}: props) => {
  const params = useParams();

  const handleClick = () => {
    if (title === "폴더 이름 변경") {
      handleFolderEdit();
      close();
    } else {
      Api.post(`folders?owner=user`, { title: newLink }).then((res) => {
        close();
        console.log(res.data);
        handlePushData(res.data);
      });
    }
  };

  const handleCreate = () => {
    Api.post(`folders/${params.folderId}/bookmarks`, { url: newLink })
      .then((res) => {
        console.log("링크 추가", res.data);
        const needs = res.data;
        Api.get(`websites/${res.data.website_id}`).then((res) => {
          console.log("추가한 링크", res.data);
          handlePushData({
            createdAt: needs.createdAt,
            updatedAt: needs.updatedAt,
            bookmark_id: needs.bookmark_id,
            favorites: false,
            website: res.data,
          });
          close();
        });
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <Div newLink={newLink}>
      <div className={open ? "bg" : ""}></div>
      <div className={open ? "modal active" : "modal"}>
        {open && (
          <div className="area">
            <div className="close">
              <span onClick={close} className="pe-7s-close"></span>
            </div>
            <div className="link-box">
              <input
                value={newLink}
                onChange={handleChange}
                placeholder={
                  title ? "폴더명을 입력하세요" : "링크를 입력하세요"
                }
              />
            </div>
            <button
              onClick={title ? handleClick : handleCreate}
              disabled={newLink === "" ? true : false}
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
      background: ${({ newLink }: { newLink: string }) =>
        newLink !== "" && "purple"};
      color: ${({ newLink }: { newLink: string }) => newLink !== "" && "white"};
    }
  }
`;
export default Modal;
