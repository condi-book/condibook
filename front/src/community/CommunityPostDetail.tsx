import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import SideBar from "../layout/SideBar";
import CalcDate from "./tools/CalcDate";

// import * from "../Api";
const dummyData = {
  title: "무야호",
  author: "hayeong",
  content:
    "무야호는 2021년 3~5월부터 대한민국에서 유행하기 시작한 인터넷 밈이다. MBC 무한도전의 2011년 방영분에서 연출된 미국 알래스카 교민 할아버지의 함성에서 유래하였다.",
  views: "123",
  created_at: new Date(),
  updated_at: new Date(),
};

const CommunityPostDetail = () => {
  const params = useParams();

  // 시간 계산 함수
  const createdTime = CalcDate(dummyData.created_at);

  const updatedTime = (createdDate: Date, updatedDate: Date) => {
    let resultText = "";
    if (createdDate.getTime() === updatedDate.getTime()) {
      return resultText;
    } else {
      resultText = "(" + CalcDate(updatedDate) + "수정 됨)";
      return resultText;
    }
  };

  // // 파라미터로 게시글 내용 받아오는 함수
  // const fetchPostDetail = async () => {
  //   try {
  //     const res = await Api.get('community', params)
  //     const {title, author, content, view, created_at, updated_at} = res.data

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  React.useEffect(() => {
    console.log("params", params);
    // fetchPostDetail()
  }, []);

  return (
    <Div>
      <div className="sidebarWrapper">
        <SideBar />
      </div>
      <div className="postWrapper">
        <div className="detailWrapper">
          <HeaderContainer>
            <H1>{dummyData.title}</H1>
            <ButtonContainer>
              <button className="hoverButton">수정</button>
              <button className="hoverButton">삭제</button>
            </ButtonContainer>
            <InfoContainer>
              <div>
                <span className="username">{dummyData.author}</span>
                <span className="separator">·</span>
                <span>{createdTime}</span>
                <span className="separator">·</span>
                <span>
                  {updatedTime(dummyData.created_at, dummyData.updated_at)}
                </span>
              </div>
            </InfoContainer>
          </HeaderContainer>
          <div>
            <span>북마크</span>
          </div>
          <div>
            <Viewer initialValue={dummyData.content} />
          </div>
          <div>
            <span>댓글</span>
          </div>
        </div>
        <div className="contentWrapper">
          <iframe width="100%" height="100%"></iframe>
        </div>
      </div>
    </Div>
  );
};

export default CommunityPostDetail;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;

  .sidebarWrapper {
    position: fixed;
  }
  .postWrapper {
    margin-left: 130px;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 2px solid black;
  }
  .detailWrapper {
    min-width: 0px;
    width: 50%;
    position: relative;
    padding: 1%;
    display: flex;
    flex-direction: column;
    border: 2px solid blue;
  }
  .contentWrapper {
    min-width: 0px;
    width: 50%;
    padding: 1%;
    display: block;
    position: relative;
    border: 2px solid green;
  }
`;

const HeaderContainer = styled.div`
  box-sizing: inherit;
`;

const H1 = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  margin-bottom: 2rem;
  word-break: keep-all; // 콘텐츠 오버플로 줄바꿈 옵션 keep-all: 줄을 바꿀 때 단어끊김 없음
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1.25rem;

  .hoverButton {
    height: 2.5rem;
    padding: 0.5rem 1rem;
    align-items: center;
    background: none;
    border-radius: 4px;
    border: none;
    display: flex;
    outline: none;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

const InfoContainer = styled.div`
  align-items: center;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;

  .username {
    font-weight: bold;
  }

  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
