import React from "react";
import { Outlet } from "react-router-dom";

const Community = () => {
  return (
    <>
      <div>커뮤니티페이지</div>
      <Outlet />
    </>
  );
};

export default Community;
