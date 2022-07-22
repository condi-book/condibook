import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import S3 from "react-aws-s3-typescript";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { AxiosError } from "axios";
import { getCookie } from "auth/util/cookie";
import { Alert } from "../layout/Alert";

import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import AddBookMarkModal from "./AddBookMarkModal";
// import FetchData from "./CommunityPostDetail";
import * as Api from "../api";

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  checked?: boolean;
}

interface imageBlob {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

// eslint-disable-next-line no-undef
window.Buffer = window.Buffer || require("buffer").Buffer;

const button = document.createElement("span");

const CommunityPostWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search); // 쿼리 스트링 변환
  const postId = params.get("id"); // 변환된 게시글 아이디 값
  const editorRef = React.useRef<ToastEditor>(null);
  const user = getCookie("user");
  const userId = user.id;

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<string | undefined>();
  const [isModifying, setIsModifying] = React.useState(false); // 새글 작성, 수정인지 구분
  const [isModalShow, setIsModalShow] = React.useState(false); // 북마크 추가 모달
  const [postBookmarks, setPostBookmarks] = React.useState<Bookmark[]>([]); // 첨부된 북마크 목록

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleContentChange = () => {
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    setContent(markDownContent);
  };

  // const handleExitButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault();
  //   navigate("/community");
  // };

  const validateTitleContent = () => {
    if (title === "") {
      Alert.fire({
        icon: "error",
        title: "제목을 입력해주세요.",
      });
      return false;
    }
    if (
      content === undefined ||
      content === "" ||
      content === null ||
      content === " "
    ) {
      Alert.fire({
        icon: "error",
        title: "내용을 입력해주세요.",
      });
      return false;
    }
    if (title.length > 20) {
      Alert.fire({
        icon: "error",
        title: "제목은 20자 이내로 작성해주세요.",
      });
      return false;
    }
    if (content.length > 5000) {
      Alert.fire({
        icon: "error",
        title: "내용은 5000자 이내로 작성해주세요.",
      });
      return false;
    }
    if (postBookmarks.length > 10) {
      Alert.fire({
        icon: "error",
        title: "북마크는 10개까지만 추가할 수 있습니다.",
      });
      return false;
    }
    return true;
  };

  // 글쓰기
  const handlePostButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (!validateTitleContent()) {
      return;
    }

    const bookmark_id = postBookmarks.map((bookmark) => bookmark.id);

    try {
      if (isModifying) {
        const body = {
          title,
          content,
          bookmark_id,
        };
        const res = await Api.put(`posts/${postId}`, body);
        navigate(`/community/${res.data.id}`);
      } else {
        const body = {
          title,
          content,
          bookmark_id,
        };

        const res = await Api.post("posts", body);
        navigate(`/community/${res.data.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 글 수정하기
  const handlePutButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (!validateTitleContent()) {
      return;
    }

    const bookmark_idArr = postBookmarks
      ?.map((bookmark) => bookmark.id)
      .filter((id) => id !== null);

    try {
      const body = {
        title,
        content,
        bookmark_id: bookmark_idArr,
      };
      const res = await Api.put(`posts/${postId}`, body);
      navigate(`/community/${res.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBookmark = (id: number) => {
    setPostBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const fetchPostContent = async () => {
    try {
      const res = await Api.get(`posts/${postId}`);
      const fetchedItem = res.data.postInfo;

      if (userId !== fetchedItem.author) {
        Alert.fire({
          icon: "error",
          title: "권한이 없습니다.",
        });
        navigate("/community");
      }

      setTitle(fetchedItem?.title);
      setContent(fetchedItem?.content);
      editorRef.current?.getInstance().setMarkdown(fetchedItem?.content);
      const res2 = await Api.get(`attached/${postId}`);
      const attachedBookmarkData = res2.data;
      const bookmarkList = attachedBookmarkData.map((data: any) => {
        return data.bookmark;
      });
      const mappedBookmarkList = bookmarkList.map((bookmark: any) => {
        return {
          id: bookmark.id,
          url: bookmark.website.url,
          title: bookmark.website.meta_title,
        };
      });
      setPostBookmarks(mappedBookmarkList);
    } catch (error) {
      const err = error as AxiosError;
      Alert.fire({
        icon: "error",
        title: "추방 실패 " + err.response?.data,
      });
      navigate("/community");
    }
  };

  // 에디터에 북마크 추가 버튼을 생성하는 함수 이후에 모달 창으로 추가 할 수 있도록 한다.
  // 모달창은 isModalShow state Hooks에 의해 열고 닫혀지고 체크박스안에 체크된 북마크를 추가할 수 있는 리스트를 보여주며 useRef로 렌더링 최적화한다.
  const createCustomButton = () => {
    button.textContent = "북마크 추가";
    button.style.cursor = "pointer";
    button.style.background =
      "linear-gradient(135deg, #12C2E9 19.08%, #C471ED 49.78%, #F64F59 78.71%)";
    button.style.color = "transparent";
    button.style.webkitBackgroundClip = "text";
    button.style.fontWeight = "bold";

    return button;
  };

  const ModalShow = () => {
    setIsModalShow(true);
  };

  const validateImage = (blob: imageBlob) => {
    if (blob.size > 5000000) {
      Alert.fire({
        icon: "error",
        title: "이미지 크기는 5MB 이하로 선택해주세요.",
      });
      return false;
    }
    if (
      blob.type !== "image/jpeg" &&
      blob.type !== "image/png" &&
      blob.type !== "image/jpg"
    ) {
      Alert.fire({
        icon: "error",
        title: "이미지 파일은 jpeg, png, jpg만 선택해주세요.",
      });
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (postId !== null) {
      setIsModifying(true);
      fetchPostContent();
    }
  }, []);

  // 원래 이미지 업로드를 지우고 s3 이미지 업로드 버튼으로 대체하는 함수
  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          if (!validateImage(blob)) {
            return;
          }
          const s3config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME as string,
            region: process.env.REACT_APP_REGION as string,
            accessKeyId: process.env.REACT_APP_ACCESS_ID as string,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY as string,
          };
          const ReactS3Client = new S3(s3config);
          ReactS3Client.uploadFile(blob, uuidv4())
            .then((data) => callback(data.location, "imageURL"))
            .catch((err) => alert(err));
        });
    }
  }, []);

  React.useEffect(() => {
    button.addEventListener("click", ModalShow);
  }, []);

  React.useEffect(() => {
    button.removeEventListener("click", ModalShow);

    return button.addEventListener("click", ModalShow);
  }, [AddBookMarkModal]);

  return (
    <Container>
      <TitleContainer>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
          value={title}
        />
        <div className="postBox">
          {!isModifying ? (
            <button className="hoverButton" onClick={handlePostButtonClick}>
              <span>등록하기</span>
            </button>
          ) : (
            <button className="hoverButton" onClick={handlePutButtonClick}>
              <span>수정하기</span>
            </button>
          )}
        </div>
      </TitleContainer>
      <ItemContainer>
        <BookmarkContainer>
          <div className="bookmark-wrap">
            {postBookmarks?.length === 0
              ? null
              : postBookmarks.map((bookmark) => (
                  <div className="bookmark-item" key={bookmark.id}>
                    <div className="bookmark-item-text">
                      {bookmark.title ?? bookmark.url}
                    </div>
                    <div
                      className="bookmark-item-delete"
                      onClick={() => handleDeleteBookmark(bookmark.id)}
                    >
                      <span className="pe-7s-close"></span>
                    </div>
                  </div>
                ))}
          </div>
        </BookmarkContainer>
      </ItemContainer>
      <ItemContainer>
        <ToastEditor
          ref={editorRef}
          previewStyle="vertical" // 미리보기 스타일 지정
          height="600px" // 에디터 창 높이
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
            [
              {
                name: "customButton",
                el: createCustomButton(),
                tooltip: "bookmark add",
                className: "last",
              },
            ],
          ]}
          language="ko-KR"
          onChange={handleContentChange}
          initialValue={content}
          placeholder="내용을 입력하세요"
        ></ToastEditor>
        <AddBookMarkModal
          isModalShow={isModalShow}
          setIsModalShow={setIsModalShow}
          setPostBookmarks={setPostBookmarks}
        />
      </ItemContainer>
    </Container>
  );
};

export default CommunityPostWrite;

const Container = styled.div`
  height: 100%;
  min-height: 0px;
  padding-bottom: 4rem;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  border-radius: 10px;
  padding: 3px;
`;

const TitleInput = styled.input`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 2vw;
  width: 90%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
`;

const ItemContainer = styled.div`
  max-height: 733.5px;
  opacity: 1;
  margin-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  .placeholder {
    cursor: auto;
    background-color: inherit;
  }
`;

const TitleContainer = styled.div`
  max-height: 733.5px;
  opacity: 1;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hoverButton {
    width: 6em;
    padding: 0.5rem 1rem;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.profileBackground};
    border-radius: 5px;
    border: none;
    display: flex;
    outline: none;
    color: white;
    font-weight: bold;

    &:hover {
      background: black;
      color: white;
    }
  }
  .postBox {
    justify-content: flex-end;
    align-items: center;
  }
`;

const BookmarkContainer = styled.div`
  padding: 0.5rem;
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
    height: 8.5rem;
    border-radius: 5px;
    background: white;
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
    .bookmark-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      .bookmark-item-text {
        font-size: 1rem;
        color: black;
        font-weight: bold;
        margin-right: 1rem;
      }
      .bookmark-item-delete {
        cursor: pointer;
        font-size: 1.5rem;
        &:hover {
          color: red;
        }
      }
    }
  }
`;
