import Logout from "auth/Logout";
import React, { useState } from "react";
import styled from "styled-components";
import ProfileModal from "./ProfileModal";

interface ProfileProps {
  data: {
    nickname: string;
    email: string;
    image_url: string;
    intro: string;
    folderCount: number;
    bookmarkCount: number;
    id: number;
  };
  handleApply: (value: any) => void;
}
const Profile = ({ data, handleApply }: ProfileProps) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show && (
        <ProfileModal
          open={show}
          close={handleClick}
          handleApply={handleApply}
        />
      )}
      <Div>
        <div className="container">
          <div className="background">
            <Button onClick={() => setShow((prev) => !prev)}>수정</Button>
            <Logout />
          </div>
          <div className="top">
            <div className="profile-box">
              {/* <span className="pe-7s-user"></span> */}
              <img src={data.image_url} alt="profile-image" />
              <div className="top-detail">
                <Font>{data.nickname}</Font>
                <div style={{ fontSize: "0.9vw" }}>{data.email}</div>
              </div>
            </div>
          </div>
          <div className="info">
            <div>{data.intro ? data.intro : "소개글을 작성해보세요"}</div>
          </div>
          <div className="bottom">
            <div className="bottom-box">
              <div>
                <span>{data.folderCount}</span>
                <span className="pe-7s-folder"></span>
              </div>
              <div>
                <span>{data.bookmarkCount}</span>
                <span className="pe-7s-link"></span>
              </div>
            </div>
          </div>
        </div>
      </Div>
    </>
  );
};

const Div = styled.div`
  position: absolute;
  width: 40vh;
  height: 70vh;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
  background-color: #f8f9fc;
  margin-left: 6vw;
  margin-top: 10px;
  z-index: 5;
  box-shadow: ${({ theme }) => theme.boxShadow};

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0;
  }

  .background {
    width: 100%;
    height: 50%;
    background: ${({ theme }) => theme.mainColor};
    text-align: right;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .pe-7s-user {
    font-size: 7rem;
    margin-right: 10%;
  }
  img {
    border-radius: 50%;
    margin-right: 10%;
    width: 22%;
  }
  .top {
    width: 100%;
    position: absolute;
    top: 36%;
    display: flex;
    // width: 100%;
    // height: 30%;
    justify-content: center;
    align-items: center;
    .profile-box {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .top-detail {
      font-size: 1.3vw;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 90%;
    }
  }
  .info {
    width: 100%;
    display: flex;
    height: 40%;
    justify-content: center;
    div {
      width: 80%;
      margin: 35px 0;
      height: 80px;
      font-size: 1vw;
      padding: 10px 0;
    }
  }
  .bottom {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    .bottom-box {
      width: 80%;
      margin: auto;
      border: ${({ theme }) => theme.border};
      padding: 10px;
      display: flex;
      justify-content: space-around;

      div {
        display: flex;
        align-items: center;
      }

      span {
        margin: 0 10px;
        font-size: 1.5vw;
      }
      .pe-7s-folder,
      .pe-7s-link {
        background: ${({ theme }) => theme.profileBackground};
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        font-weight: bold;
      }
    }
  }
`;

const Font = styled.div`
  color: white;
  font-weight: bold;
`;

export const Button = styled.button`
  margin: 10px;
  font-weight: bold;
  background: none;
  color: white;
  font-size: 1.1vw;
  &:hover {
    background: rgba(255, 255, 255, 0.7);
    color: black;
  }
`;

export default Profile;
