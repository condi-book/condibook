import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CalcData from "../community/tools/CalcDate";

interface SearchProps {
  handleCategory: (e: any) => void;
  searchData: any;
  category: string;
}
// 검색 리스트(링크별)
const SearchList = ({ handleCategory, searchData, category }: SearchProps) => {
  const navigate = useNavigate();
  return (
    <Div>
      <div className="search-main">
        <div className="search-category">
          <div className="category-wrap">
            <div className="category-container">
              <button onClick={handleCategory} id="global-link">
                <div>전체</div>
                <p>
                  {searchData?.postInfo?.length +
                    searchData?.folderInfo?.teamFolders?.length +
                    searchData?.folderInfo?.myFolder?.length}
                </p>
              </button>
              <button onClick={handleCategory} id="global-folder">
                <div>내 폴더</div>
                <p>{searchData?.folderInfo?.myFolder?.length}</p>
              </button>
              <button onClick={handleCategory} id="global-team">
                <div>팀 폴더</div>
                <p>{searchData?.folderInfo?.teamFolders?.length}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="search-list">
          {category == "global-link" &&
            searchData?.postInfo?.map((item: any) => {
              const createdTime = CalcData(new Date(item.createdAt));
              return (
                <div className="card-wrap" key={`search-${item.id}`}>
                  <div
                    className="card"
                    onClick={() => navigate(`/community/${item.id}`)}
                  >
                    <div className="like-middle">
                      <div className="like-title like">{item.title}</div>
                      <div className="like fonts">{createdTime}</div>
                    </div>
                    <div className="like-footer">
                      <div className="fonts author">{item.author_name}</div>
                      <div className="likes-box">
                        <span className="pe-7s-like fonts"></span>
                        <p className="fonts">{item.like_counts}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {category !== "global-team" &&
            searchData?.folderInfo?.myFolder.map((item: any) => (
              <div className="card-wrap" key={`search-${item.id}`}>
                <div
                  className="card"
                  onClick={() => navigate(`/bookmark/${item.id}`)}
                >
                  <div className="folder-title">{item.title}</div>
                  <span className="pe-7s-folder"></span>
                </div>
              </div>
            ))}
          {category !== "global-folder" &&
            searchData?.folderInfo?.teamFolders.map((item: any) => (
              <div className="card-wrap" key={`search-${item.id}`}>
                <div
                  className="card"
                  onClick={() => navigate(`/team/${item.team_id}/${item.id}`)}
                >
                  <div className="folder-title">{item.title}</div>
                  <span className="pe-7s-folder"></span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  height: 85%;
  background: #f5f5f5;
  border-radius: 10px;

  .folder-title {
    font-size : 1.2vw;
    font-weight: bold;
    text-align: right;
    
  }

  .pe-7s-folder {
    margin; auto;
    font-size: 3vw;
    background: ${({ theme }) => theme.mainColor};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    align-self: flex-end;
    
  }

  
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
  }
  .like-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    

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
    .pe-7s-like {
      font-weight: bold;
      color: ${({ theme }) => theme.subRedColor};
    }
    
`;

export default SearchList;
