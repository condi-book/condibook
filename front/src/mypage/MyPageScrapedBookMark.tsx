import React, { useEffect, useState } from "react";
import * as Api from "../api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CalcData from "../community/tools/CalcDate";

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
        {likesData?.length > 0 ? (
          <div className="like-wrap">
            {likesData.map((v) => {
              const createdTime = CalcData(new Date(v.createdAt));
              return (
                <LikeCard
                  className="like-item"
                  key={`likes-${v.id}`}
                  onClick={() => navigate(`/community/${v.post.id}`)}
                >
                  <div className="like-middle">
                    <div className="like-title like">{v.post.title}</div>
                    <div className="like fonts">{createdTime}</div>
                  </div>
                  <div className="like-footer">
                    <div className="fonts author">{v.post.author_name}</div>
                    <div className="likes-box">
                      <span className="pe-7s-like fonts"></span>
                      <p className="fonts">{v.post.like_counts}</p>
                    </div>
                  </div>
                </LikeCard>
              );
            })}
          </div>
        ) : (
          <Null>
            <img src="/static/img/preference.svg" />
            <div>좋아요한 게시글을 한눈에 확인하세요</div>
          </Null>
        )}
      </div>
    </Div>
  );
};

const Div = styled.div<StyleSize>`
  width: 100%;
  padding: 10px;
  height: 90%;

  .pe-7s-like {
    font-weight: bold;
    color: ${({ theme }) => theme.subRedColor};
  }
  .like-container {
    width: 100%;
    height: 100%;
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
      box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
      transition: box-shadow 0.1s linear;
      &:hover {
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const LikeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .author {
    font-weight: bold;
  }

  .fonts {
    font-size: 0.9vw;
  }

  .like {
    width: 100%;
  }

  .like-title {
    font-size: 1.2vw;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .like-middle {
    width: 100%;
    margin-top: 12%;
  }
  .like-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5%;

    .likes-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      p {
        margin: 0;
        margin-left: 5px;
      }
    }
  }
`;

const Null = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  img {
    width: 20%;
  }
  div {
    margin-top: 10px;
  }
`;
export default MypageScrapedBookmark;
