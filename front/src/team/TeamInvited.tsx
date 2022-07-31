import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TeamInvited = () => {
  const params = useParams();

  React.useEffect(() => {
    console.log(params);
  }, []);

  return (
    <Container>
      <h1>초대되었습니다.</h1>
    </Container>
  );
};

export default TeamInvited;

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

// const Button = styled.button`
//   width: 150px;
//   height: 50px;
//   font-size: 20px;
//   font-weight: bold;
//   background: ${({ theme }) => theme.profileBackground};
//   color: white;
//   cursor: pointer;
//   margin-bottom: 30px;
//   box-shadow: ${({ theme }) => theme.boxShadow};
// `;
