import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import SideBar from "../layout/SideBar";
import CalcDate from "./tools/CalcDate";

// import * from "../Api";
const dummyData = {
  title: "Lorem Ipsum",
  author: "hayeong",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis, lorem at vehicula faucibus, ligula enim aliquam nibh, non imperdiet eros risus eu dui. Nulla sodales suscipit finibus. Maecenas ornare tempus auctor. Aenean blandit dui risus, pharetra lacinia nunc luctus et. Integer molestie scelerisque est, in vestibulum elit pellentesque at. Praesent suscipit vehicula auctor. In vitae justo eu ex vestibulum maximus. Ut accumsan lacus eget tellus iaculis dapibus.",
  views: "123",
  created_at: new Date(),
  updated_at: new Date(),
};

interface Bookmark {
  id: string;
  title: string;
  image: string;
  content: string;
  link: string;
}
const bookmarkList: Bookmark[] = [
  {
    id: "1",
    title: "티스토리",
    image: "",
    content: "내용을 입력해주세요",
    link: "https://tychejin.tistory.com/231",
  },
  {
    id: "2",
    title: "okayoon",
    image: "",
    content: "내용을 입력해주세요",
    link: "https://okayoon.tistory.com/entry/%EC%95%84%EC%9D%B4%ED%94%84%EB%A0%88%EC%9E%84iframe",
  },
  {
    id: "3",
    title: "nykim",
    image: "",
    content: "내용을 입력해주세요",
    link: "https://nykim.work/107",
  },
  {
    id: "5",
    title: "티스토리",
    image: "",
    content: "내용을 입력해주세요",
    link: "link4",
  },
  {
    id: "6",
    title: "티스토리",
    image: "",
    content: "내용을 입력해주세요",
    link: "link4",
  },
  {
    id: "7",
    title: "티스토리",
    image: "",
    content: "내용을 입력해주세요",
    link: "link4",
  },
  {
    id: "8",
    title: "티스토리",
    image: "",
    content: "내용을 입력해주세요",
    link: "link4",
  },
];

const CommunityPostDetail = () => {
  const params = useParams();
  const [list, setList] = React.useState<Bookmark[]>([]);
  const [link, setLink] = React.useState("");

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
    setList(bookmarkList);
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
          <BookmarkContainer>
            <h4 className="title">북마크</h4>
            <Ol>
              {list?.length === 0 ? (
                <p>북마크 없음</p>
              ) : (
                list.map((item) => {
                  return (
                    <li
                      key={`bookmark-${item.id}`}
                      onClick={() => setLink(item.link)}
                    >
                      <span className="pointer">{item.title}</span>
                    </li>
                  );
                })
              )}
            </Ol>
          </BookmarkContainer>
          <div>
            <Viewer initialValue={dummyData.content} />
          </div>
          <div>
            <span>댓글</span>
          </div>
        </div>
        <div className="contentWrapper">
          <iframe src={link} width="100%" height="100%"></iframe>
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

const BookmarkContainer = styled.div`
  margin: 2rem;
  padding: 2rem 1.5rem;
  border: 2px solid black;
  border-radius: 8px;
  position: relative;
  .title {
    margin-top: 0px;
    font-weight: bold;
    padding-right: 2rem;
    font-size: 1.5rem;
  }
`;

const Ol = styled.ol`
  padding-left: 1rem;
  line-height: 1.8;
  font-size: 1rem;
  counter-reset: item 0;
  .pointer {
    cursor: pointer;
  }
`;
