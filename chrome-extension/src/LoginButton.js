import styled from "styled-components";

const LoginButton = () => {
  // 서비스 페이지 새탭으로 열기
  const handleNavigate = () => {
    window.open("https://condibook.site/login", "newWindow");
  };

  return (
    <Div className="login">
      <button onClick={handleNavigate}>로그인</button>
    </Div>
  );
};

const Div = styled.div`
  height: 400px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background:linear-gradient(
    135deg,
    rgba(18, 194, 233, 0.2) 0.61%,
    rgba(196, 113, 237, 0.2) 51.86%,
    rgba(246, 79, 89, 0.2) 100%
  );
  border-radius: 10px;

  button {
    font-size: 20px;
    background: linear-gradient(135deg, #12c2e9, #c471ed, #f64f59);
    border:none;
    border-radius: 5px;
    padding: 10px;
    color: white;

    &:hover {
      background : #111215;
      font-weight: bold;
      cursor: pointer;
  }
`;

export default LoginButton;
