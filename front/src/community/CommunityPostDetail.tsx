import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";

import CalcDate from "./tools/CalcDate";
import CommunityPostComments from "./CommunityPostComments";
// import { UserStateContext } from "../App";
import { getCookie } from "auth/util/cookie";
import { Alert } from "../layout/Alert";
import Loading from "layout/Loading";

import * as Api from "../api";

export interface FetchData {
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
  id: number;
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
  const user = getCookie("user");
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
  const [newWindowOpen, setNewWindowOpen] = React.useState<boolean>(false); // 새창을 열었는지
  const [isBlocked, setIsBlocked] = React.useState<boolean>(false); // 차단되었는지
  const [isCondiBook, setIsCondiBook] = React.useState<boolean>(false); // 미리보기 할 페이지가 우리 페이지 인지
  const [isLoading, setIsLoading] = React.useState<boolean>(false); // 로딩중인지

  // 시간 계산하여 문자열 리턴해주는 함수
  const createdTime = React.useCallback(CalcDate, [fetchData]);
  // const updatedTime = React.useCallback(
  //   (createdDate: Date, updatedDate: Date) => {
  //     let resultText = "";
  //     if (createdDate === undefined || updatedDate === undefined) {
  //       return resultText;
  //     }
  //     if (createdDate?.getTime() === updatedDate?.getTime()) {
  //       return resultText;
  //     } else {
  //       resultText = "(" + CalcDate(updatedDate) + " 수정 됨)";
  //       return resultText;
  //     }
  //   },
  //   [fetchData],
  // );

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
      alert(e);
    }
  };

  const checkAuthor = (author: string) => {
    const userId = user.id;
    if (userId === author) {
      return true;
    }
    return false;
  };

  // 게시글 수정 이벤트
  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!checkAuthor(fetchData?.author)) {
      return alert("글쓴이만 수정 가능합니다.");
    }
    e.preventDefault();
    navigate(`/community/write?id=${postId}`);
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!checkAuthor(fetchData?.author)) {
        return alert("글쓴이만 삭제 가능합니다.");
      }
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        await Api.delete(`posts/${postId}`);
        navigate("/community");
      } else {
        return;
      }
    } catch (err) {
      alert(err);
    }
  };

  // 댓글 변경 이벤트
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
  };

  const handleClickBookmark = async (url: string) => {
    setLink(url);
  };

  const handleClickCopy =
    (url: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      navigator.clipboard.writeText(url);
      Alert.fire({
        icon: "success",
        title: "클립보드에 복사되었습니다.",
      });
    };

  const handleCommentPostClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (comment === "") {
      alert("댓글을 입력해주세요");
      return;
    }
    try {
      const body = {
        content: comment,
      };
      const res = await Api.post(`comments/${postId}`, body);
      setComments((prev) => [...prev, res.data]);
      setComment("");
    } catch (e) {
      alert(e);
    }
  };

  const fetchComments = async () => {
    const res = await Api.get(`comments/list/${postId}`);
    setComments(res.data);
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

        // const convertFromStringToDate = (responseDate: string) => {
        //   let dateComponents = responseDate.split("T");
        //   let datePieces = dateComponents[0].split("-");
        //   let timePieces = dateComponents[1].split(":");
        //   let date = new Date(
        //     parseInt(datePieces[0]),
        //     parseInt(datePieces[1]) - 1,
        //     parseInt(datePieces[2]),
        //     parseInt(timePieces[0]),
        //     parseInt(timePieces[1]),
        //     parseInt(timePieces[2]),
        //   );
        //   return date;
        // };

        // const paredCreatedAt = convertFromStringToDate(createdAt.toString());
        // const paredUpdatedAt = convertFromStringToDate(updatedAt.toString());

        setFetchData({
          author,
          author_name,
          content,
          createdAt,
          updatedAt,
          id,
          title,
          like_counts,
          views,
        });
        viewerRef.current?.getInstance().setMarkdown(content); // 받아온 값으로 뷰어 세팅
        setIsfetched(true);
        setLikeCount(like_counts);

        const bookmarkData: Omit<Bookmark[], "checked"> = res.data.websitesInfo;
        setList(
          bookmarkData?.map((bookmark) => {
            return { ...bookmark, checked: true };
          }),
        );

        const likedIDList = res.data.likesInfo.map(
          (likeData: any) => likeData.user_id,
        );
        const userID = user.id;

        if (likedIDList.includes(userID)) {
          setLiked(true);
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchPostDetail();
    fetchComments();
  }, []);

  React.useEffect(() => {
    if (iframeRef.current !== null) {
      iframeRef.current.onload = () => {
        setIsLoading(false);
        if (iframeRef.current.contentWindow.length === 0) {
          setIsBlocked(true);
        }
        if (iframeRef.current.contentWindow.length > 0) {
          setIsBlocked(false);
        }
      };
    }
  }, []);

  React.useEffect(() => {
    if (newWindowOpen) {
      window.open(link, "_blank");
      setNewWindowOpen(false);
    }
  }, [newWindowOpen]);

  React.useEffect(() => {
    if (link?.includes(window.location.origin)) {
      setIsCondiBook(true);
    }
    setIsBlocked(false);
    setIsLoading(true);
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
            <SubTitle>
              <InfoContainer>
                <div>
                  <span className="username">{fetchData?.author_name}</span>
                  <span className="separator">·</span>
                  <span>{createdTime(new Date(fetchData?.createdAt))}</span>
                  <span className="separator">·</span>
                  <span>조회수 {fetchData?.views}</span>
                </div>
              </InfoContainer>
              <ButtonContainer className="change-btn">
                <button className="hoverButton" onClick={handleEditClick}>
                  수정
                </button>
                <button className="hoverButton" onClick={handleDeleteClick}>
                  삭제
                </button>
              </ButtonContainer>
            </SubTitle>
          </HeaderContainer>
          {list?.length === 0 ? (
            <></>
          ) : (
            <BookmarkContainer>
              <h4 className="title">공유 북마크</h4>
              <div className="bookmark-wrap">
                <Ol>
                  {list?.map((item) => {
                    return (
                      <Row key={`bookmark-${item.id}`}>
                        <li onClick={() => handleClickBookmark(item.url)}>
                          <span className="pointer">
                            {item.meta_title ??
                              item.meta_description ??
                              item.url}
                          </span>
                        </li>
                        <button
                          className="copy-button"
                          onClick={handleClickCopy(item.url)}
                        >
                          <span className="pe-7s-copy-file"></span>
                        </button>
                      </Row>
                    );
                  })}
                </Ol>
              </div>
            </BookmarkContainer>
          )}
          {isfetched ? (
            <div style={{ paddingBottom: "2vw", height: "60%" }}>
              <Viewer initialValue={fetchData.content} />
            </div>
          ) : (
            <div>로딩중...</div>
          )}
          <CommentWrapper>
            <CommentCount>{`${comments.length}개의 댓글`}</CommentCount>
            <div>
              <CommentInput
                placeholder="댓글을 입력하세요"
                value={comment}
                onChange={handleCommentChange}
              ></CommentInput>
              <ButtonContainer>
                <button
                  className="hoverButton"
                  onClick={handleCommentPostClick}
                  style={{ padding: "5px 10px" }}
                >
                  댓글 등록
                </button>
              </ButtonContainer>
            </div>
            <div>
              <CommunityPostComments
                comments={comments}
                setComments={setComments}
              />
            </div>
          </CommentWrapper>
        </div>
        <div className="contentWrapper">
          {!link && (
            <Warning>
              <img src="/static/img/communitybookmark.svg" alt="preview" />
              <div>
                해당 게시글에 공유된 북마크를 클릭하여 미리보기(preview) 기능을
                사용해보세요
              </div>
            </Warning>
          )}
          {isBlocked && (
            <Warning>
              <img src="/static/img/notify.svg" alt="blocked" />
              <div>미리보기가 거부된 북마크 입니다</div>
              <div>새 탭으로 여시겠습니까?</div>
              <button
                onClick={() => {
                  setNewWindowOpen(true);
                }}
              >
                새 탭으로 열기
              </button>
              <div>
                CondiBook 크롬 확장 프로그램을 설치하시면 미리보기로 보실 수
                있습니다.
              </div>
            </Warning>
          )}
          {isCondiBook && (
            <Warning>
              <img src="/static/img/warning.svg" alt="warning" />
              <div>저희 서비스 페이지는 미리보기로 보실 수 없습니다.</div>
            </Warning>
          )}
          {isLoading && <Loading />}
          <iframe
            src={link}
            width="100%"
            height={!link || isBlocked || isLoading ? "0%" : "100%"}
            ref={iframeRef}
            loading="lazy"
            allow="autoplay; encrypted-media"
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
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  .change-btn {
    button {
      padding: 5px 10px;
    }
  }

  .sidebarWrapper {
    position: fixed;
  }
  .postWrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 10px;
  }
  .detailWrapper {
    min-width: 0px;
    width: 50%;
    position: relative;
    padding: 1% 1% 0 1%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    margin: 10px;
  }
  .contentWrapper {
    min-width: 0px;
    width: 50%;
    padding: 1%;
    display: block;
    position: relative;
    background: #f5f5f5;
    border-radius: 10px;
    margin: 10px;
    max-height: 100%;
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
  margin-bottom: 20px;

  .likeWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .likeCount {
    font-size: 1.5vw;
    font-weight: bold;
    margin: 0;
  }
`;

const LikeButton = styled.span<{ like: boolean }>`
  font-size: 2.3vw;
  font-weight: bold;
  color: ${(props) => (props.like ? props.theme.subRedColor : "black")};
  cursor: pointer;
  background: none;
`;

const H1 = styled.h1`
  font-size: 2.3vw;
  max-width: 650px;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  word-break: keep-all; // 콘텐츠 오버플로 줄바꿈 옵션 keep-all: 줄을 바꿀 때 단어끊김 없음
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 5;
  width: 100%;
  position: relative;
  font-size: 1vw;

  .comment-button {
    margin-top: -0.5rem;
  }
  .hoverButton {
    height: 100%;
    weight: 100%;
    padding: 10px;
    align-items: center;
    background: none;
    border-radius: 5px;
    border: none;
    display: flex;
    outline: none;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.profileBackground};
      color: white;
    }
  }
  .pe-7s-like {
    font-size: 2.5rem;
  }
`;

const InfoContainer = styled.div`
  align-items: center;
  font-size: 1vw;
  display: flex;
  justify-content: space-between;
  width: 80%;

  .username {
    font-weight: bold;
  }

  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const BookmarkContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${({ theme }) => theme.profileBackground};

  border-radius: 8px;
  position: relative;
  .title {
    margin-top: 0px;
    font-weight: bold;
    padding-right: 2rem;
    font-size: 1.5rem;
    color: white;
  }

  .bookmark-wrap {
    border-radius: 5px;
    background: white;
    padding: 1vw;
  }
`;

const Ol = styled.ol`
  padding: 5px;
  padding-left: 1rem;
  line-height: 1.8;
  font-size: 1rem;
  counter-reset: item 0;

  list-style-type: disc;
  .pointer {
    cursor: pointer;
  }
  li {
    width: 100%;
  }

  li:hover {
    font-weight: bold;
    cursor: pointer;
  }
  button {
    width: 30px;
    margin-left: 2rem;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const CommentCount = styled.h4`
  font-size: 1.2vw;
  line-height: 1.5;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CommentInput = styled.textarea`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid black;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1.1vw;
  line-height: 1.75;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommentWrapper = styled.div`
  background: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
`;
const Warning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 768px;
  width: 100%;
  img {
    width: 20%;
    margin-bottom: 20px;
  }
  div {
    width: 50%;
    font-size: 1.2vw;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  button {
    font-size: 1.2vw;
    background: ${({ theme }) => theme.profileBackground};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    margin-bottom: 20px;

    &:hover {
      background: ${({ theme }) => theme.subBlackColor};
    }
  }
`;
