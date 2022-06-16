import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import SideBar from "../layout/SideBar";

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
  const calcTime = (date: Date) => {
    const seconds = 1;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let today = new Date();
    let calculatedTime = Math.floor((today.getTime() - date.getTime()) / 1000);

    let resultText = "";
    if (calculatedTime < seconds) {
      resultText = "방금 전";
    } else if (calculatedTime < minute) {
      resultText = "약 " + calculatedTime + "초 전";
    } else if (calculatedTime < hour) {
      resultText = "약 " + Math.floor(calculatedTime / minute) + "분 전";
    } else if (calculatedTime < day) {
      resultText = "약 " + Math.floor(calculatedTime / hour) + "시간 전";
    } else if (calculatedTime < day * 15) {
      resultText = "약 " + Math.floor(calculatedTime / day) + "일 전";
    } else {
      resultText =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");
    }
    return resultText;
  };

  const updatedTime = (createdDate: Date, updatedDate: Date) => {
    let resultText = "";
    if (createdDate.getTime() === updatedDate.getTime()) {
      return resultText;
    } else {
      resultText = "(" + calcTime(updatedDate) + "수정 됨)";
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
    <>
      <Div>
        <SideBar />
        <Container>
          <H1>{dummyData.title}</H1>
          <ButtonGroup>
            <button className="hoverButton">수정</button>
            <button className="hoverButton">삭제</button>
          </ButtonGroup>
          <InfoGroup>
            <div>
              <span className="username">{dummyData.author}</span>
              <span className="separator">·</span>
              <span>{calcTime(dummyData.created_at)}</span>
              <span className="separator">·</span>
              <span>
                {updatedTime(dummyData.created_at, dummyData.updated_at)}
              </span>
            </div>
          </InfoGroup>
          <span>북마크</span>
          <div>
            <Viewer initialValue={dummyData.content} />
          </div>
          <span>댓글</span>
        </Container>
      </Div>
    </>
  );
};

export default CommunityPostDetail;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;
`;

const Container = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  min-height: 0px;
  padding-bottom: 4rem;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
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

const ButtonGroup = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-bottom: -1.25rem;

  .hoverButton {
    height: 2.5rem;
    padding: 0.5rem 1rem;
    -webkit-box-align: center;
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

const InfoGroup = styled.div`
  -webkit-box-align: center;
  align-items: center;
  font-size: 1rem;
  color: var(--text2);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;

  .username {
    font-weight: bold;
  }

  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
