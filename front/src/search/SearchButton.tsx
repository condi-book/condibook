import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search`);
  };
  return (
    <>
      <Div>
        <button onClick={handleClick}>
          <span className="pe-7s-search"></span>
        </button>
      </Div>
    </>
  );
};

const Div = styled.div`
  position: fixed;
  bottom: 15%;
  right: 3%;
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
    padding: 0.7vw;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: ${({ theme }) => theme.subBlackColor};
    }
    .pe-7s-search {
      font-weight: bold;
      font-size: 2.5vw;
    }
  }
`;

export default SearchButton;
