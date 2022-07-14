import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      ></div>
      <Container>
        <img
          src="/static/img/warning.svg"
          alt="warning"
          style={{ marginBottom: "20px" }}
        />
        <p>로그인이 필요한 페이지 입니다.</p>
        <Button onClick={() => navigate("/login")}>로그인하기</Button>
      </Container>
    </div>
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
  height: 75%;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background: ${({ theme }) => theme.profileBackground};
  color: white;
  border: 1px solid #5e5b52;
  cursor: pointer;
  margin-bottom: 30px;
`;

export default NotFound;
