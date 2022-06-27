import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../api";
import { DispatchContext } from "../App";

const UserDelete = () => {
  const dispatch: any = useContext(DispatchContext);
  const navigate = useNavigate();

  // 회원 탈퇴 기능
  const handleClick = () => {
    Api.delete(`user`).then(() => {
      console.log("삭제 성공");
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    });
  };

  return (
    <div>
      <button onClick={handleClick}>회원 탈퇴</button>
    </div>
  );
};

export default UserDelete;
