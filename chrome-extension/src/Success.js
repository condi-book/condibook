import { useParams } from "react-router-dom";
import styled from "styled-components";

const Success = () => {
  const params = useParams();

  return (
    <Div className="success">
      <Img src="/logo.png" alt="logo" width="30" />
      <h2>링크가 저장되었습니다!</h2>
      <div className="middle">
        <img width="150px" src="/success.svg" alt="성공" />
        <div className="folder">
          <div>저장 폴더 : {params.folder}</div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => window.open("http://localhost:3000", "newWindow")}
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

  .middle {
    text-align: center;
  }
  .folder {
    div {
      font-size: 16px;
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
`;
export default Success;
