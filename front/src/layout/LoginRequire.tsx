import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <img
        src="/static/img/warning.svg"
        alt="warning"
        style={{ marginBottom: "20px" }}
      />
      <p>로그인이 필요한 페이지 입니다.</p>
      <Button onClick={() => navigate("/login")}>로그인하기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.lightMainColor};

  img {
    width: 20%;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background: ${({ theme }) => theme.profileBackground};
  color: white;
  cursor: pointer;
  margin-bottom: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export default NotFound;
