import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../api";
import { DispatchContext } from "../App";
import styled from "styled-components";
import { removeCookie } from "auth/util/cookie";
import { warningAlert, Alert } from "layout/Alert";

const UserDelete = () => {
  const dispatch: any = useContext(DispatchContext);
  const navigate = useNavigate();

  // 회원 탈퇴 기능
  const handleClick = (e: any) => {
    warningAlert(e, "회원 탈퇴 하시겠습니까?", () => {
      Api.delete(`user`).then(async () => {
        await removeCookie("userToken", {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        });
        await dispatch({ type: "LOGOUT" });
        await Alert.fire({
          icon: "success",
          title: "그동안 서비스를 이용해주셔서 감사합니다.",
        });
        await navigate("/");
      });
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>회원 탈퇴</Button>
    </div>
  );
};

export default UserDelete;

export const Button = styled.button`
  border-radius: 5px;
  padding: 5px;
  background: none;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.profileBackground};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
