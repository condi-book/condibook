import React, { useState } from "react";
import styled from "styled-components";

const FolderSelect = ({ folderList, handlePage, cookie }) => {
  // 폴더명, 직접입력 인풋 및 값 상태 관리
  const [folder, setFolder] = useState(folderList[0]);
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 폴더 선택 이벤트
  const handleChange = (e) => {
    setFolder(e.target.value);

    if (e.target.value === "직접 입력") {
      setInput(true);
    } else {
      setInput(false);
      setInputValue("");
    }
  };

  // 직접입력 인풋 이벤트
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 제출 이벤트
  const handleClick = () => {
    if (input && inputValue) {
      handlePage();
      // fetch("http://localhost:5001/bookmarks", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${cookie}`,
      //       },
      //       mode: "cors",
      //       body: JSON.stringify({
      //         folder_id: 0,
      //         website_id: 59
      //       }),
      //     })
      //       .then((res) => console.log("성공"))
      window.close();
    } else if (!input && folder) {
      handlePage();
    } else {
      alert("선택된 폴더가 없습니다.");
    }
  };

  return (
    <>
      <div className="popup">
        <div className="popup-container">
          <div>
            <div id="label">저장 폴더 *</div>
            <select className="select" name="category" onChange={handleChange}>
              {folderList?.map((item) => (
                <option key={`option-${item.id}`} value={item.title}>
                  {item.title}
                </option>
              ))}
              <option value="직접 입력">직접 입력</option>
            </select>
          </div>
          <input
            type="text"
            className="input"
            value={inputValue}
            placeholder={input ? "폴더명을 입력하세요" : ""}
            disabled={input ? false : true}
            onChange={handleInputChange}
          ></input>
        </div>
        <div id="confirm-folder">
          {folder === "직접 입력" ? inputValue : folder}
        </div>
      </div>
      <div className="bottom">
        <button id="getUrl" onClick={handleClick}>
          저장하기
        </button>
      </div>
    </>
  );
};

// const Section = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: 100%;

//   #confirm-folder {
//     font-weight: bold;
//     font-size: 20px;
//     padding: 20px;
//   }
// `;

// const SubmitButton = styled.div`
//   height: 100px;

//   #getUrl {
//     height: 100%;
//   }
// `;
// const Div = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: space-around;
//   align-items: flex-end;

//   #label {
//     margin-bottom: 10px;
//     font-weight: bold;
//   }
// `;

// const Select = styled.select`
//   width: 130px;
//   height: 35px;
// `;

// const Input = styled.input`
//   width: 130px;
//   height: 35px;
//   box-sizing: border-box;
// `;

export default FolderSelect;
