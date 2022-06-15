import React from "react";
import { useParams } from "react-router-dom";

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

  React.useEffect(() => {
    console.log("params", params);
  }, []);

  return (
    <>
      <div>
        <div>제목{dummyData.title}</div>
        <div>북마크</div>
        <div>내용{dummyData.content}</div>
        <div>유저 조회수 날짜{dummyData.author}</div>
        <div>댓글</div>
      </div>
    </>
  );
};

export default CommunityPostDetail;
