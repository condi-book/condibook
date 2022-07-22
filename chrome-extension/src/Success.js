import styled from "styled-components";

const Success = ({ folder, inputValue, data }) => {
  // 서비스 페이지 새탭으로 열기
  const handleNavigate = () => {
    window.open("https://kdt-ai4-team14.elicecoding.com/bookmark", "newWindow");
  };

  return (
    <Div className="success">
      <Img src="/logo.png" alt="logo" width="30" onClick={handleNavigate} />
      <h2>링크가 저장되었습니다!</h2>
      <div className="middle">
        <img width="150px" src="/success.svg" alt="성공" />
        <div className="folder">
          <div>
            저장 폴더 :{" "}
            <span id="folderName">
              {folder === "직접입력" ? inputValue : folder}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            const folderId = data.folders.find((f) => f.title === folder).id;
            if (folderId) {
              window.open(
                `https://kdt-ai4-team14.elicecoding.com/bookmark/${folderId}`,
                "newWindow"
              );
            } else {
              window.open(
                "https://kdt-ai4-team14.elicecoding.com/bookmark",
                "newWindow"
              );
            }
          }}
        >
          지금 확인하기 {">"}
        </Button>
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(18, 194, 233, 0.2) 0.61%,
    rgba(196, 113, 237, 0.2) 51.86%,
    rgba(246, 79, 89, 0.2) 100%
  );

  .middle {
    text-align: center;
  }
  .folder {
    div {
      font-size: 16px;
    }

    #folderName {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  &:hover {
    background: linear-gradient(135deg, #12c2e9, #c471ed, #f64f59);
    color: white;
  }
`;

const Img = styled.img`
  align-self: flex-start;
  margin-left: 6px;
  cursor: pointer;
`;
export default Success;
