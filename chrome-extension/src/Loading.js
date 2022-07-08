import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
const override = {
  background: "linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)",
  borderRadius: `50%`,
  padding: `20px`,
};

const Loading = () => {
  return (
    <Div>
      <HashLoader size={40} cssOverride={override} color={"white"} />
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
