import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const MypageNavbar = () => {
  const navigate = useNavigate();
  return (
    <Div className="container">
      <div>
        <div className="nav-bar">
          <span onClick={() => navigate("/mybookmark")}>나의 북마크</span>
          <span onClick={() => navigate("/scrapbookmark")}>
            스크랩한 북마크
          </span>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  .nav-bar {
    padding: 15px 30px;
    border 1px solid rgba(76, 76, 76, 0.1);
    border-radius: 20px;
    display: flex;
    justify-content: space-around;

    span {
      margin 0 30px;
      font-size: 25px;
      font-weight: 600;
      transition: all 0.4s;
      cursor: pointer;

    }
  }
`;

export default MypageNavbar;
