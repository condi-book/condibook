import React, { useState, useContext } from "react";
import styled from "styled-components";
import ProfileModal from "./ProfileModal";
import { UserStateContext } from "../App";

const Profile = () => {
  const [show, setShow] = useState(false);
  const userContext: any = useContext(UserStateContext);
  const { user } = userContext;
  const [userInfo, setUserInfo] = useState(user);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleChange = (value: any) => setUserInfo(value);

  return (
    <>
      {show && (
        <ProfileModal
          data={userInfo}
          open={show}
          close={handleClick}
          handleApply={handleChange}
        />
      )}
      <Div>
        <div className="container">
          <div className="background">
            <button onClick={() => setShow((prev) => !prev)}>
              프로필 수정
            </button>
          </div>
          <div className="top">
            <div className="box">
              <span className="pe-7s-user"></span>
              {/* <img src={user.image_url} alt="profile-image" /> */}
              <div className="top-detail">
                <div>{userInfo.nickname}</div>
                <div>{userInfo.email}</div>
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              {userInfo.intro ? userInfo.intro : "소개글을 작성해보세요"}
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-box">
              <div>
                <span>{userInfo.folderCount}</span>
                <span>폴더</span>
              </div>
              <div>
                <span>{userInfo.bookmarkCount}</span>
                <span>북마크</span>
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
    background: ${({ theme }) => theme.profileBackground};
  }

  .pe-7s-user {
    font-size: 7rem;
    margin-right: 10%;
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
      font-size: 1.5rem;
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

      span {
        margin: 0 10px;
        font-size: 1.5rem;
      }
    }
  }
`;
export default Profile;
