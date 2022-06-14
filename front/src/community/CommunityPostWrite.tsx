import React from "react";

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
    <div>
      <p>{title}</p>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={handleTitleChange}
      />
      <ToastEditor
        ref={editorRef}
        previewStyle="vertical" // 미리보기 스타일 지정
        height="300px" // 에디터 창 높이
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
    </div>
  );
};

export default CommunityPostWrite;
