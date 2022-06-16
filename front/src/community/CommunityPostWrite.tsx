import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const dummyData = {
  title: "무야호",
  author: "hayeong",
  content:
    "무야호는 2021년 3~5월부터 대한민국에서 유행하기 시작한 인터넷 밈이다. MBC 무한도전의 2011년 방영분에서 연출된 미국 알래스카 교민 할아버지의 함성에서 유래하였다.",
  views: "123",
  created_at: new Date(),
  updated_at: new Date(),
};

const CommunityPostWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search); // 쿼리 스트링 변환
  const postId = params.get("id"); // 변환된 게시글 아이디 값

  const editorRef = React.useRef<ToastEditor>(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<string | undefined>();
  const [isModifying, setIsModifying] = React.useState(false); // 새글 작성, 수정인지 구분

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleContentChange = () => {
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    setContent(markDownContent);
    console.log(markDownContent);
  };

  const handleExitButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handlePostButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    console.log(title, content); // 글 보내기
  };

  // const fetchPostContent = async () => {
  //   try {
  //     const res = await Api.get("community", postId)
  //     const fetchedItem = res.data;

  //     setTitle(fetchedItem.title)
  //     setContent(fetchedItem.content)
  //   } catch (err) {
  //     alert('error', err)
  //     navigate(-1)
  //   }
  // }

  React.useEffect(() => {
    console.log(params.get("id"));
    postId ?? setIsModifying(true); // postId가 null 혹은 undefined인지 체크하고 아니라면 수정중으로 변경

    if (postId !== null) {
      // fetchPostContent()
      setTitle(dummyData.title);
      setContent(dummyData.content);
      editorRef.current?.getInstance().setMarkdown(dummyData.content);
    }
  }, []);
  return (
    <Container>
      <ItemContainer>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
          value={title}
        />
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
          ]}
          language="ko-KR"
          onChange={handleContentChange}
          initialValue={content}
        ></ToastEditor>
      </ItemContainer>
      <ItemContainer>
        <ButtonContainer>
          <button className="hoverButton" onClick={handleExitButtonClick}>
            <span>나가기</span>
          </button>
          <div className="postBox">
            <button className="hoverButton" onClick={handlePostButtonClick}>
              <span>{isModifying ? "수정하기" : "등록하기"}</span>
            </button>
          </div>
        </ButtonContainer>
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
`;

const TitleInput = styled.input`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
`;

const ItemContainer = styled.div`
  max-height: 733.5px;
  opacity: 1;
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const ButtonContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 100%;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  background: var(--editor-footer);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;

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

  .postBox {
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
  }
`;
