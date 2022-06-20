import SideBar from "layout/SideBar";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { KeyboardContext } from "../App";

type StyleProps = {
  show: boolean;
};

const Search = () => {
  const keyboardContext: any = useContext(KeyboardContext);
  const [show, setShow] = useState(false);
  return (
    <Div show={show}>
      {keyboardContext.sidebar === true && <SideBar />}
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <div className="search-dropdown">
              <div
                className="search-dropdown-header"
                onClick={() => setShow((prev) => !prev)}
              >
                <p>전체검색</p>
                <span className="pe-7s-angle-down" />
              </div>
              <div className="search-select hi">
                <div>전체 검색</div>
                <div>나의 콘텐츠 검색</div>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-box">
                <button className="search-delete-button">
                  <img src="static/img/close_button.svg" />
                </button>
                <button>
                  <span className="pe-7s-search"></span>
                </button>
                <input type="text" placeholder="검색어를 입력하세요" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;
  height: 100vh;

  .search-section {
    margin: auto;
    width: 90vw;
    border: 2px solid red;
    height: 100%;
  }
  .search-container {
    position: sticky;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 110px;
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
      width: 174px;
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
        width: 174px;
        padding: 50px 20px 0px;
        border-radius: 8px;
        background-color: rgb(235, 235, 235);
        z-index: 3;
        height: ${({ show }) => (show ? "168px" : "50px")};
        visibility: ${({ show }) => (show ? "visible" : "hidden")};
        transition: height 0.3s ease-out;

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
        width: 174px;
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
      }
    }
  }
`;
export default Search;
