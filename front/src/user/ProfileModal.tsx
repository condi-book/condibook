import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "../api";
import { Alert } from "layout/Alert";

interface ProfileProps {
  open: boolean;
  close: () => void;
  handleApply: (value: any) => void;
}

const ProfileModal = ({ open, close, handleApply }: ProfileProps) => {
  const [initialIntro, setInitialIntro] = useState("");
  const [modifiedData, setModifiedData] = useState({
    nickname: "",
    email: "",
    intro: "",
    image_url: "",
    id: 0,
    folderCount: 0,
    bookmarkCount: 0,
  });
  // 프로필 수정 버튼 클릭 함수
  const handleClick = async () => {
    await Api.put(`user/nickname`, { nickname: modifiedData.nickname });
    if (modifiedData.intro !== initialIntro) {
      await Api.put(`user/intro`, { intro: modifiedData.intro });
    }
    await handleApply(modifiedData);
    await Alert.fire({
      icon: "success",
      title: "수정이 완료되었습니다.",
    });
    await close();
  };

  useEffect(() => {
    Api.get(`user/info`).then((res) => {
      console.log(res.data);
      setModifiedData(res.data);
      setInitialIntro(res.data.intro);
    });
  }, []);

  const handleChange = (e: any) => {
    setModifiedData({
      ...modifiedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Div>
      <div className={open ? "bg" : ""}></div>
      <div className={open ? "modal active" : "modal"}>
        {open && (
          <div className="area">
            <div className="area-content">
              <div className="close">
                <span onClick={close} className="pe-7s-close"></span>
              </div>
              <div className="link-box">
                <div className="title">닉네임</div>
                <div>
                  <input
                    className="profile-input"
                    placeholder="닉네임을 입력해주세요"
                    maxLength={10}
                    value={modifiedData.nickname}
                    name="nickname"
                    onChange={handleChange}
                  />
                </div>
                <p style={{ fontSize: "0.8vw" }}>10자 이하로 작성해주세요</p>
              </div>
              <div className="link-box">
                <div className="title">소개</div>
                <textarea
                  className="profile-textarea"
                  maxLength={80}
                  placeholder="소개글을 입력해주세요"
                  value={modifiedData.intro ? modifiedData.intro : ""}
                  name="intro"
                  onChange={handleChange}
                />
                <div className="profile-textlimit">
                  {modifiedData.intro ? modifiedData.intro.length : "0"}/80
                </div>
              </div>
              <div className="btn-box">
                <button
                  disabled={modifiedData.nickname ? false : true}
                  onClick={handleClick}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Div>
  );
};

const Div = styled.div`
  * {
    font-size: 1vw;
  }
  .btn-box {
    width: 100%;
    margin-top: 10%;
    height: 50px;
    button {
      width: 100%;
      height: 100%;
      font-weight: bold;

      &:hover {
        background: ${({ theme }) => theme.profileBackground};
        color: white;
      }
    }
  }
  .title {
    margin-bottom: 3%;
  }
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
      // background: ${({ theme }) => theme.middleMainColor};
      width: 20vw;
      height: 60vh;
      border-radius: 10px;
      // padding: 10px;
    }
    .area-content {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .close {
      text-align: right;
      font-weight: bold;
      height: 20%;

      span {
        font-size: 3vw;
      }

      span:hover {
        color: gray;
        cursor: pointer;
      }
    }
  }
  p {
    margin-top: 2px;
    font-size: 10px;
  }

  .profile-input {
    padding-bottom: 10px;
    width: 100%;
    font-size: 1vw;
    font-weight: 400;
    line-height: 24px;
    border: none;
    border-bottom: 1px solid rgb(52, 52, 52);

    &:focus {
      outline: none;
      border-bottom: ${({ theme }) => `1px solid ${theme.subRedColor}`};
    }
  }

  .profile-textarea {
    width: 100%;
    height: 100px;
    font-size: 1vw;
    font-weight: 400;
    line-height: 24px;
    border: none;
    border-bottom: 1px solid rgb(196, 196, 196);
    resize: none;

    &:focus {
      outline: none;
      border-bottom: ${({ theme }) => `1px solid ${theme.subRedColor}`};
    }
  }

  .profile-textlimit {
    // position: absolute;
    // left: 57%;
    // top: 59%;
    // color: rgb(196, 196, 196);
    // font-size: 0.8vw;
    // font-weight: 400;
    // line-height: 24px;
    position: absolute;
    right: 42%;
    top: 63%;
    color: rgb(196, 196, 196);
    font-size: 0.8vw;
    font-weight: 400;
  }
`;

export default ProfileModal;
