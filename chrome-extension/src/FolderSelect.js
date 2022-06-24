import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FolderSelect = ({ folderList }) => {
  const navigate = useNavigate();
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
      navigate(`/${inputValue}`);
    } else if (!input && folder) {
      navigate(`/${folder}`);
    } else {
      alert("선택된 폴더가 없습니다.");
    }
  };

  return (
    <>
      <Section>
        <Div>
          <div>
            <div id="label">저장 폴더 *</div>
            <Select name="category" onChange={handleChange}>
              {folderList?.map((item) => (
                <option key={`option-${item}`} value={item}>
                  {item}
                </option>
              ))}
              <option value="직접 입력">직접 입력</option>
            </Select>
          </div>
          <Input
            value={inputValue}
            placeholder={input ? "폴더명을 입력하세요" : ""}
            disabled={input ? false : true}
            onChange={handleInputChange}
          ></Input>
        </Div>
        <div id="confirm-folder">
          {folder === "직접 입력" ? inputValue : folder}
        </div>
      </Section>
      <SubmitButton className="bottom">
        <button id="getUrl" onClick={handleClick}>
          저장하기
        </button>
      </SubmitButton>
    </>
  );
};

const Select = styled.select`
  width: 130px;
  height: 35px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: flex-end;

  #label {
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 130px;
  height: 35px;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  #confirm-folder {
    font-weight: bold;
    font-size: 20px;
    padding: 20px;
  }
`;

const SubmitButton = styled.div`
  height: 100px;

  #getUrl {
    height: 100%;
  }
`;
export default FolderSelect;
