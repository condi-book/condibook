import React, { useEffect, useState } from "react";
import * as Api from "../api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type StyleSize = {
  styleSize: () => number;
};

const MypageScrapedBookmark = () => {
  const [likesData, setLikesData] = useState([]);
  const navigate = useNavigate();

  // 스타일 디자인 px 계산 변수
  const styleSize = () => {
    if (likesData?.length > 12) return 0 + (likesData.length / 6) * 10;
    else return 0;
  };

  useEffect(() => {
    Api.get(`likes`).then((res) => {
      console.log(res.data);
      setLikesData(res.data);
    });

    console.log(likesData);
  }, []);
  return (
    <Div styleSize={styleSize}>
      <div className="like-container">
        <div className="like-wrap">
          {likesData.map((v) => {
            return (
              <div
                className="like-item"
                key={`likes-${v.id}`}
                onClick={() => navigate(`/community/${v.post.id}`)}
              >
                <div className="like-title">{v.post.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<StyleSize>`
  width: 100%;
  padding: 10px;
  border: 1px solid red;
  height: 90%;

  .like-container {
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    background: ${({ theme }) => theme.subGrayColor};
    border-radius: 10px;
    margin-bottom: ${(props) => props.styleSize}px;
  }

  .like-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;

    .like-item {
      background-color: white;
      margin: 0.833%;
      padding: 10px;
      width: 15%;
      box-sizing: border-box;
      height: 25vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 7px;
      transition: box-shadow 0.1s linear;
      border: ${({ theme }) => theme.border};
      &:hover {
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
export default MypageScrapedBookmark;
