import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import CalcDate from "./tools/CalcDate";
import CommunityPostComments from "./CommunityPostComments";

// import * from "../Api";
const dummyData = {
  title: "Lorem Ipsum",
  author: "hayeong",
  content:
    "**Lorem ipsum dolor sit amet**, consectetur adipiscing elit. Aliquam lobortis, lorem at vehicula faucibus, ligula enim aliquam nibh, non imperdiet eros risus eu dui. Nulla sodales suscipit finibus. Maecenas ornare tempus auctor. Aenean blandit dui risus, pharetra lacinia nunc luctus et. Integer molestie scelerisque est, in vestibulum elit pellentesque at. Praesent suscipit vehicula auctor. In vitae justo eu ex vestibulum maximus. Ut accumsan lacus eget tellus iaculis dapibus.",
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

export interface Comment {
  id: string;
  content: string;
  author: string;
  author_name: string;
  board_id: string;
  updatedAt: Date;
  createdAt: Date;
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

type postDetailRouteParams = {
  postId: string;
};
const CommunityPostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<
    keyof postDetailRouteParams
  >() as postDetailRouteParams;
  const [list, setList] = React.useState<Bookmark[]>([]);
  const [link, setLink] = React.useState("");
  const [like, setLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Comment[]>([]);

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

  const handleLikeClick = () => {
    setLike(!like);
    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  };

  const handleEditClick = () => {
    navigate(`/community/write?id=${postId}`);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
  };

  const handleCommentPostClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setComments([
      ...comments,
      {
        id: "1",
        content: comment,
        author: "hayeong",
        author_name: "하영",
        board_id: postId,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  };
  // // 파라미터로 게시글 내용 받아오는 함수
  // const fetchPostDetail = async () => {
  //   try {
  //     const res = await Api.get('community', params)
  //     const {title, author, content, view, created_at, updated_at} = res.data
  //

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  React.useEffect(() => {
    // fetchPostDetail()
    setList(bookmarkList);
    const user = sessionStorage.getItem("user");
    const { id } = JSON.parse(user);
    console.log(id);
  }, []);

  return (
    <Div>
      <div className="postWrapper">
        <div className="detailWrapper">
          <HeaderContainer>
            <TitleContainer>
              <H1>{dummyData.title}</H1>
              <div className="likeWrapper" onClick={handleLikeClick}>
                <LikeButton className="pe-7s-like" like={like} />
                <p className="likeCount">{likeCount}</p>
              </div>
            </TitleContainer>

            <ButtonContainer>
              <button className="hoverButton" onClick={handleEditClick}>
                수정
              </button>
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
          <CommentCount>{`${comments.length}개의 댓글`}</CommentCount>
          <div>
            <CommentInput
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={handleCommentChange}
            ></CommentInput>
            <ButtonContainer>
              <button className="hoverButton" onClick={handleCommentPostClick}>
                댓글 등록
              </button>
            </ButtonContainer>
            <CommunityPostComments comments={comments} />
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
  width: 100%;
  height: 100%;

  .sidebarWrapper {
    position: fixed;
  }
  .postWrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 2px solid black;
    height: 100vh;
  }
  .detailWrapper {
    min-width: 0px;
    height: 100%;
    width: 50%;
    position: relative;
    padding: 1%;
    display: flex;
    flex-direction: column;
    border: 2px solid blue;
  }
  .contentWrapper {
    min-width: 0px;
    height: 100%;
    width: 50%;
    padding: 1%;
    display: block;
    position: relative;
    border: 2px solid green;
  }
`;

const HeaderContainer = styled.div`
  box-sizing: inherit;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  .likeWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .likeCount {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const LikeButton = styled.span<{ like: boolean }>`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => (props.like ? "pink" : "black")};
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
  margin-bottom: -2rem;
  z-index: 5;

  .hoverButton {
    height: 100%;
    weight: 100%;
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
  .pe-7s-like {
    font-size: 2.5rem;
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

const CommentCount = styled.h4`
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CommentInput = styled.textarea`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid black;
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  line-height: 1.75;
`;
