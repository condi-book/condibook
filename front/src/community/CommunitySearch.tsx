import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import CalcDate from "./tools/CalcDate";
import { PostPreview } from "./CommunityPage";

type StyleProps = {
  show: boolean;
};

type Tab = "제목" | "제목 + 내용";

const CommunitySearch = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>("제목");
  const [word, setWord] = React.useState("");
  // 데이터
  const [data, setData] = React.useState([]);

  // 검색 리스트
  const SearchList = () => {
    const handlePostClick =
      (id: string) => (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate(`/community/${id}`);
      };
    return (
      <div className="search-main">
        <div className="search-list">
          {data?.map((item: PostPreview) => (
            <Col key={`search-${item.id}`}>
              <Card onClick={handlePostClick(item.id)}>
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardinfoText>
                    <span>{CalcDate(new Date(item.createdAt))}</span>
                  </CardinfoText>
                </CardBody>
                <CardFooter>
                  <div className="userInfo">
                    <b>{item.author_name}</b>
                  </div>
                  <div className="likes">
                    <span className="pe-7s-like like"></span>
                    <p>{item.like_counts}</p>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </div>
      </div>
    );
  };

  // 검색어 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handelSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ///search/community?order=likes&pageNumber=1&content=g&type=1
    const url =
      tab === "제목"
        ? `search/community?order=likes&pageNumber=1&content=${word}&type=0`
        : `search/community?order=likes&pageNumber=1&content=${word}&type=1`;
    const res = await Api.get(url);
    setData(res.data);
    console.log(res.data);
  };

  // 검색 조건 핸들러
  const handleTab = (e: React.MouseEvent<HTMLDivElement>) => {
    setTab((e.target as HTMLElement).textContent as Tab);
    setShow((prev) => !prev);
  };

  // 검색창 초기화 함수
  const handleDelete = () => {
    setWord("");
  };

  return (
    <Div show={show}>
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <div className="search-dropdown">
              <div
                className="search-dropdown-header"
                onClick={() => setShow((prev) => !prev)}
              >
                <p>{tab}</p>
                <span className="pe-7s-angle-down" />
              </div>
              <div className="search-select">
                <div onClick={handleTab}>제목</div>
                <div onClick={handleTab}>제목 + 내용</div>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-box">
                {word && (
                  <button
                    onClick={handleDelete}
                    className="search-delete-button"
                  >
                    <img
                      src="/static/img/close_button.svg"
                      width="22"
                      height="22"
                    />
                  </button>
                )}
                <button onClick={handelSearch}>
                  <span className="pe-7s-search"></span>
                </button>
                <input
                  value={word}
                  onChange={handleChange}
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
              </div>
            </div>
          </div>
        </div>
        {data ? (
          <SearchList />
        ) : (
          <div className="search-image">
            <img src="/static/img/search.svg" width="30%" height="30%" />
            <p>커뮤니티 검색</p>
          </div>
        )}
      </div>
    </Div>
  );
};

const Col = styled.div`
  width: 15rem;
  border: ${({ theme }) => theme.border};
  box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
  border-radius: 5px;
  background: white;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  transition: box-shadow 0.1s linear;

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Div = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;
  height: 100vh;

  .search-section {
    margin: auto;
    width: 90vw;
    height: 100%;
  }
  .search-container {
    position: sticky;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15%;
    padding-top: 5%;
  }
  .search-box {
    position: relative;
    width: 900px;
    height: 50px;
    -webkit-box-pack: justify;
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;

    .search-dropdown {

      position: relative;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      width: 200px;
      height: 100%;
      margin-right: 10px;


      .search-select {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: flex-start;
        width: 200px;
        padding: 50px 20px 0px;
        border-radius: 8px;
        background-color: rgb(235, 235, 235);
        z-index: 3;
        height: ${({ show }) => (show ? "168px" : "50px")};
        visibility: ${({ show }) => (show ? "visible" : "hidden")};
        transition: height 0.3s ease-out;
        position: absolute;
        top: 0;

        div {
          display: flex;
          -webkit-box-pack: start;
          justify-content: flex-start;
          -webkit-box-align: center;
          align-items: center;
          width: 100%;
          height: 35px;
          color: rgb(96, 96, 96);
          font-size: 16px;
          letter-spacing: -0.05em;
          cursor: pointer;
          font-weight: 700;
        }
      }

      .search-dropdown-header {
        position: absolute;
        top: 0px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        width: 200px;
        height: 50px;
        padding: 0px 20px;
        border-radius: 8px;
        color: rgb(96, 96, 96);
        background-color: rgb(235, 235, 235);
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.05em;
        z-index: 4;
        cursor: pointer;

        p {
          margin: auto 0;
        }
        span {
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }

  .search-input {
    position: relative;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: flex-start;
    width: calc(100% - 174px);
    height: 50px;

    .search-input-box {
      position: absolute;
      top: 0px;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;

      input {
        width: 100%;
        height: 50px;
        padding-left: 20px;
        color: rgb(96, 96, 96);
        background-color: rgb(235, 235, 235);
        border-radius: 8px;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.05em;
        z-index: 11;
      }

      .search-delete-button {
        position: absolute;
        right: 61px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(96, 96, 96);
        font-size: 18px;
        font-weight: 300;
        cursor: pointer;
        z-index: 12;
        background: none;
      }

      .pe-7s-search {
        position: absolute;
        top: 13px;
        right: 22px;
        width: 18.59px;
        height: 18px;
        z-index: 12;
        cursor: pointer;
        font-size: 25px;
      }
    }
  }
  .search-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85%;

    p {
      margin-top: 5%;
      font-size: 30px;
      font-weight: bold;
    }
  }
  .search-main {
    width: 70rem;
    margin: 0 auto;
    margin-top: 8%;
    z-index:1;
    

    .search-list {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      z-index: 1;
      
    }
    .card-wrap {
      width: 50%;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: justify;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 140px;
      padding: 20px;
      margin: 0px 10px 20px 10px;
      background: white;
      border: 1px solid rgb(235, 235, 235);
      box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
      border-radius: 8px;
      cursor: pointer;
      .card-title {
        font-size: 16px;
        font-weight: bold;
        color: rgb(96, 96, 96);
        letter-spacing: -0.05em;
      }
      .card-author {
        font-size: 14px;
        font-weight: 300;
        color: rgb(96, 96, 96);
        letter-spacing: -0.05em;

    }
  }

  .search-category {
    position: sticky;
    top: 110px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    padding-bottom: 40px;
    background-color: none;
    z-index: 1;

    .category-wrap {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      padding-top: 5%;
      width: 100%;
    }

    .category-container {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;

      button {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        margin-right: 10px;
        padding: 6px 6px 6px 20px;
        border-radius: 20px;
        background-color: rgb(50, 46, 255);
        cursor: inherit;

        div {
          color: white;
          font-weight: bold;
          font-size: 14px;
          margin-right: 20px;
        }

        p {
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          color: rgb(50, 46, 255);
          background-color: white;
          padding: 4px 8px;
          margin: auto;
        }
      }
    }
  }
`;
export default CommunitySearch;

const Card = styled.div`
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 0.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 14rem;
  .imgWrapper {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;
const CardTitle = styled.h4`
  font-size: 1rem;
  margin: 0px 0px 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
`;
// const CardText = styled.p`
//   display: block;
//   margin: 0px 0px 1.5rem;
//   word-break: break-word;
//   overflow-wrap: break-word;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   height: 3.9375rem;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
const CardinfoText = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
`;
const CardFooter = styled.div`
  padding: 0.2rem 1rem;
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  justify-content: space-between;

  .userInfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    // align-items: center;
  }
  .likes {
    display: flex;
    flex-direction: row;
  }
  .like {
    width: 100%;
    height: 100%;
    margin-right: 0.5rem;
    font-size: 20px;
    color: ${({ theme }) => theme.subRedColor};
    font-weight: bold;
  }
`;
