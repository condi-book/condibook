import Loading from "layout/Loading";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import { AxiosError } from "axios";
import { Alert } from "../layout/Alert";
import { getCookie } from "auth/util/cookie";
import LoginRequire from "layout/LoginRequire";

const TeamInvited = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVerfied, setIsVerfied] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const user = getCookie("user");
  if (!user) {
    return <LoginRequire />;
  }

  const fetchVerify = async () => {
    try {
      await Api.post(`teams/verify`, {
        token: params.token,
      });
      setIsVerfied(true);
      setIsLoading(false);
      await Alert.fire({
        icon: "success",
        title: "초대 인증 성공",
      });
    } catch (e) {
      const error = e as AxiosError;
      setIsLoading(false);
      Alert.fire({
        icon: "error",
        title: "초대 인증 실패 \n" + error.response?.data,
      });
    }
  };

  React.useEffect(() => {
    fetchVerify();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : isVerfied ? (
        <>
          <img
            src="/static/img/verified.svg"
            alt="인증 성공"
            style={{ marginBottom: "20px" }}
          />
          <h1>인증 성공</h1>
          <Button onClick={() => navigate("/")}>🏠 홈으로</Button>
        </>
      ) : (
        <>
          <img
            src="/static/img/warning.svg"
            alt="인증 실패"
            style={{ marginBottom: "20px" }}
          />
          <h1>인증 실패</h1>
          <Button onClick={() => navigate("/")}>🏠 홈으로</Button>
        </>
      )}
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
