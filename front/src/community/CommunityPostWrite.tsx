import React from "react";
import styled from "styled-components";

import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const CommunityPostWrite = () => {
  const editorRef = React.useRef<ToastEditor>(null);
  const [title, setTitle] = React.useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };
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
          initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
        ></ToastEditor>
      </ItemContainer>
      <ItemContainer>
        <ButtonContainer>
          <button className="post-button">
            <span>나가기</span>
          </button>
          <div className="postBox">
            <button className="post-button">
              <span>등록하기</span>
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

  .post-button {
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
