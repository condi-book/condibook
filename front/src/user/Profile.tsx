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
  handleChange: (e: any) => void;
}
const Profile = ({ data, handleApply, handleChange }: ProfileProps) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show && (
        <ProfileModal
          data={data}
          open={show}
          close={handleClick}
          handleApply={handleApply}
          handleChange={handleChange}
        />
      )}
      <Div>
        <div className="container">
          <div className="background">
            <Logout />
            <button onClick={() => setShow((prev) => !prev)}>
              프로필 수정
            </button>
          </div>
          <div className="top">
            <div className="box">
              {/* <span className="pe-7s-user"></span> */}
              <img src={data.image_url} alt="profile-image" />
              <div className="top-detail">
                <Font>{data.nickname}</Font>
                <div>{data.email}</div>
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
  border: 2px solid black;
  border-radius: 10px;
  background-color: #f8f9fc;
  margin-left: 120px;
  margin-top: 10px;
  z-index: 5;

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
  }

  .pe-7s-user {
    font-size: 7rem;
    margin-right: 10%;
  }
  img {
    border-radius: 50%;
    margin-right: 10%;
    width: 30%;
  }
  .top {
    position: absolute;
    top: 26%;
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    .box {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .top-detail {
      font-size: 1.3rem;
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
      margin: 20% 0;
      height: 60%;
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
      border: 1px solid black;
      padding: 10px;
      display: flex;
      justify-content: space-around;

      div {
        display: flex;
        align-items: center;
      }

      span {
        margin: 0 10px;
        font-size: 1.5rem;
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
export default Profile;
