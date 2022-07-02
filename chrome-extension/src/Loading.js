import styled from "styled-components";

const Loading = () => {
  return (
    <Div>
      {/* <div className="loader10"></div> */}
      <div>loading</div>
    </Div>
  );
};

const Div = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 10px;
  background: linear-gradient(
    135deg,
    rgba(18, 194, 233, 0.2) 0.61%,
    rgba(196, 113, 237, 0.2) 51.86%,
    rgba(246, 79, 89, 0.2) 100%
  );
`;
export default Loading;
