import styled from "styled-components";

const Fail = () => {
  return (
    <Div className="success">
      <Img src="/logo.png" alt="logo" width="30" />
      <h2>해당 링크는 저장이 불가능합니다.</h2>
      <div className="middle">
        <img width="150px" src="/fail.svg" alt="실패" />
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
`;

const Img = styled.img`
  align-self: flex-start;
  margin-left: 6px;
  padding-bottom: 50px;
`;
export default Fail;
