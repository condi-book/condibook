import SideBar from "layout/SideBar";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { KeyboardContext } from "../App";
import * as Api from "../api";
import SearchList from "./SearchList";

type StyleProps = {
  category: string;
};

const Search = () => {
  const keyboardContext: any = useContext(KeyboardContext);
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("global-link");
  // 데이터
  const [searchData, setSearchData]: any = useState([]);

  // 카테고리 핸들러
  const handleCategory: (e: any) => void = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setCategory((e.currentTarget as HTMLElement).id);
    console.log(category);
  };

  // 검색어 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    Api.get(`search/unified?content=${e.target.value}`)
      .then((res) => {
        setSearchData(res.data);
        console.log(res.data);
      })
      .catch(() =>
        setSearchData({
          postInfo: [],
          folderInfo: { myFolder: [], teamFolders: [] },
        }),
      );
  };

  // 검색창 초기화 함수
  const handleDelete = () => {
    setWord("");
  };

  return (
    <Div category={category}>
      {keyboardContext.sidebar === true && <SideBar />}
      <div className="search-border">
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <div className="search-input">
                <div className="search-input-box">
                  {word && (
                    <button
                      onClick={handleDelete}
                      className="search-delete-button"
                    >
                      <img
                        src="static/img/close_button.svg"
                        width="22"
                        height="22"
                      />
                    </button>
                  )}
                  <button>
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
          {word ? (
            <SearchList
              handleCategory={handleCategory}
              searchData={searchData}
              category={category}
            />
          ) : (
            <div className="search-image">
              <img
                src="/static/img/allsearch.svg"
                alt="검색"
                width="30%"
                height="30%"
              />
              <p>원하는 콘텐츠를 검색해보세요</p>
            </div>
          )}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  background: #eff6fc;

  .search-border {
    width: 100%;
    padding: 10px 10px 10px 0;
  }

  .search-section {
    width: 100%;
    background: white;
    border-radius: 10px;
    height: 100%;
    padding: 10px;
  }
  .search-container {
    // position: sticky;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15%;
    padding-top: 20px;
  }
  .search-box {
    display: flex;
    width: 70%;
    height: 40px;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;

    .search-dropdown {
      position: relative;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      width: 30%;
      height: 100%;
      margin-right: 10px;

      .search-select {
        top: 0px;
        position: absolute;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: flex-start;
        width: 80%;
        padding: 50px 20px 0px;
        border-radius: 8px;
        background-color: rgb(235, 235, 235);
        z-index: 3;
        transition: height 0.3s ease-out;

        div {
          display: flex;
          -webkit-box-pack: start;
          justify-content: flex-start;
          -webkit-box-align: center;
          align-items: center;
          width: 100%;
          height: 40px;
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
        width: 80%;
        height: 40px;
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
    height: 40px;

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
        height: 40px;
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
        top: 9px;
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
    background: #f5f5f5;
    border-radius: 10px;

    p {
      margin-top: 5%;
      font-size: 1.5vw;
      font-weight: bold;
    }
  }
  .search-main {
    width: 64%;
    margin: 0 auto;

    .search-list {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
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
      align-items: flex-start;
      width: 95%;
      height: 140px;
      padding: 20px;
      margin: 0px 10px 20px 10px;
      background: white;
      border: 1px solid rgb(235, 235, 235);
      box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
      border-radius: 8px;
      cursor: pointer;
      transition: box-shadow 0.1s linear;

      &:hover {
        box-shadow: ${({ theme }) => theme.boxShadow};
      }
    }
  }

  .search-category {
    // position: sticky;
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
        background: ${({ theme }) => theme.middleMainColor};
        cursor: pointer;

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
          margin: auto;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  #global-link {
    background: ${({ category, theme }) =>
      category === "global-link" && theme.profileBackground};
    box-shadow: ${({ category, theme }) =>
      category === "global-link" && theme.boxShadow};
  }

  #global-folder {
    background: ${({ category, theme }) =>
      category === "global-folder" && theme.profileBackground};
    box-shadow: ${({ category, theme }) =>
      category === "global-folder" && theme.boxShadow};
  }

  #global-team {
    background: ${({ category, theme }) =>
      category === "global-team" && theme.profileBackground};
    box-shadow: ${({ category, theme }) =>
      category === "global-team" && theme.boxShadow};
  }
`;
export default Search;
