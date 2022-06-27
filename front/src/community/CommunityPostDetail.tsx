import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import CalcDate from "./tools/CalcDate";
import CommunityPostComments from "./CommunityPostComments";

import * as Api from "../api";

interface FetchData {
  author: string;
  author_name: string;
  title: string;
  content: string;
  views: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  like_counts: number;
}

interface Bookmark {
  id: string;
  meta_title: string;
  img: string;
  meta_description: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  checked: boolean;
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

type postDetailRouteParams = {
  postId: string;
};
const CommunityPostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<
    keyof postDetailRouteParams
  >() as postDetailRouteParams; // 이렇게 하면 postId를 쿼리로 받을 수 있다.
  const viewerRef = React.useRef<Viewer>(null); // toast ui viewer ref
  const iframeRef = React.useRef<HTMLIFrameElement>(null); // iframe ref
  const [fetchData, setFetchData] = React.useState<FetchData>(null); // 디테일 데이터
  const [isfetched, setIsfetched] = React.useState<boolean>(false); // 정보를 받아왔는지
  const [list, setList] = React.useState<Bookmark[]>(null); // 북마크 리스트
  const [liked, setLiked] = React.useState<boolean>(false); // 보고있는 유저가 좋아요를 눌렀는지
  const [link, setLink] = React.useState(""); // iframe에 넣을 link
  const [likeCount, setLikeCount] = React.useState(0); // 좋아요 개수
  const [comment, setComment] = React.useState(""); // 쓰고있는 댓글 내용
  const [comments, setComments] = React.useState<Comment[]>([]); // 댓글 리스트

  // 시간 계산하여 문자열 리턴해주는 함수
  const createdTime = React.useCallback(CalcDate, [fetchData]);
  const updatedTime = React.useCallback(
    (createdDate: Date, updatedDate: Date) => {
      let resultText = "";
      if (createdDate === undefined || updatedDate === undefined) {
        return resultText;
      }
      if (createdDate?.getTime() === updatedDate?.getTime()) {
        return resultText;
      } else {
        resultText = "(" + CalcDate(updatedDate) + " 수정 됨)";
        return resultText;
      }
    },
    [fetchData],
  );

  // 좋아요 버튼 클릭 시 이벤트
  const handleLikeClick = async () => {
    try {
      const body = {};
      if (liked) {
        await Api.delete(`likes`, postId);
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        await Api.post(`likes/${postId}`, body);
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 게시글 수정 이벤트
  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/community/write?id=${postId}`);
  };

  // 댓글 변경 이벤트
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
    setComment("");
  };

  // 게시글 내용 받아오는 함수
  React.useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await Api.get(`posts/${postId}`);
        const {
          author,
          author_name,
          content,
          createdAt,
          updatedAt,
          id,
          title,
          like_counts,
          views,
        }: FetchData = res.data.postInfo;
        console.log(res.data.postInfo);

        const convertFromStringToDate = (responseDate: string) => {
          let dateComponents = responseDate.split("T");
          let datePieces = dateComponents[0].split("-");
          let timePieces = dateComponents[1].split(":");
          let date = new Date(
            parseInt(datePieces[0]),
            parseInt(datePieces[1]) - 1,
            parseInt(datePieces[2]),
            parseInt(timePieces[0]),
            parseInt(timePieces[1]),
            parseInt(timePieces[2]),
          );
          return date;
        };

        const paredCreatedAt = convertFromStringToDate(createdAt.toString());
        const paredUpdatedAt = convertFromStringToDate(updatedAt.toString());

        setFetchData({
          author,
          author_name,
          content,
          createdAt: paredCreatedAt,
          updatedAt: paredUpdatedAt,
          id,
          title,
          like_counts,
          views,
        });
        viewerRef.current?.getInstance().setMarkdown(content); // 받아온 값으로 뷰어 세팅
        setIsfetched(true);
        setLikeCount(like_counts);

        const attachedRes = await Api.get(`attached/${postId}`);
        const bookmarkData: Omit<Bookmark[], "checked"> = attachedRes.data;
        setList(() => {
          if (bookmarkData === undefined) {
            return;
          }
          return bookmarkData.map((bookmark) => {
            return { ...bookmark, checked: true };
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostDetail();
  }, []);

  React.useEffect(() => {
    try {
      console.log(iframeRef.current.innerHTML);
    } catch (err) {
      console.error(err);
    }
  }, [link]);

  return (
    <Div>
      <div className="postWrapper">
        <div className="detailWrapper">
          <HeaderContainer>
            <TitleContainer>
              <H1>{fetchData?.title}</H1>
              <div className="likeWrapper" onClick={handleLikeClick}>
                <LikeButton className="pe-7s-like" like={liked} />
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
                <span className="username">{fetchData?.author_name}</span>
                <span className="separator">·</span>
                <span>{createdTime(fetchData?.createdAt)}</span>
                <span className="separator">·</span>

                <span>
                  {updatedTime(fetchData?.createdAt, fetchData?.updatedAt)}
                </span>
                <span className="separator">·</span>
                <span>조회수 {fetchData?.views}</span>
              </div>
            </InfoContainer>
          </HeaderContainer>
          <BookmarkContainer>
            <h4 className="title">북마크</h4>
            <Ol>
              {list === null || list?.length === 0 ? (
                <p>북마크 없음</p>
              ) : (
                list?.map((item) => {
                  return (
                    <li key={`bookmark-${item.id}`}>
                      <span
                        className="pointer"
                        onClick={() => setLink(item.url)}
                      >
                        {item.meta_title ?? item.meta_description ?? item.url}
                      </span>
                    </li>
                  );
                })
              )}
            </Ol>
          </BookmarkContainer>
          {isfetched ? (
            <Viewer initialValue={fetchData.content} />
          ) : (
            <div>로딩중...</div>
          )}
          <CommentCount>{`${comments.length}개의 댓글`}</CommentCount>
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
        <div className="contentWrapper">
          <iframe
            src={link}
            width="100%"
            height="100%"
            ref={iframeRef}
          ></iframe>
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
    height: 100%;
  }
  .detailWrapper {
    min-width: 0px;
    width: 50%;
    position: relative;
    padding: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  width: 100%;
  position: relative;

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
