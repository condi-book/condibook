import React, { useState } from "react";
import styled from "styled-components";
import GlobalAddBookmarkModal from "./GlobalAddBookMarkModal";

const GlobalAddBookmarkButton = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <Div>
        <button onClick={handleClick}>
          <span className="pe-7s-plus"></span>
        </button>
      </Div>
      {show && <GlobalAddBookmarkModal open={show} close={handleClick} />}
    </>
  );
};

const Div = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
  width: 50px;
  height: 50px;
  background: none;
  z-index: 999;

  button {
    background: ${({ theme }) => theme.profileBackground};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: ${({ theme }) => theme.subBlackColor};
    }
    .pe-7s-plus {
      font-weight: bold;
      font-size: 30px;
    }
  }
`;

export default GlobalAddBookmarkButton;
