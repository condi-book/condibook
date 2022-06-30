import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import CommunityPostList from "./CommunityPostList";

export interface PostPreview {
  id: string;
  author: string;
  author_name: string;
  createdAt: Date;
  title: string;
  like_counts: number;
  updatedAt: Date;
  views: number;
}

type StyleProps = {
  value: string;
  sortState: string;
};

const CommunityPage = () => {
  const navigate = useNavigate();
  const [sortState, setSortState] = useState<string>("new");

  const radios = React.useMemo(
    () => [
      { name: "최신순", value: "new" },
      { name: "좋아요순", value: "like" },
      { name: "조회수순", value: "view" },
    ],
    [],
  );

  const handleToggleChange = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const { value } = event.currentTarget;
      console.log(value);
      setSortState(value);
    },
    [],
  );

  const handlePostClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/community/write");
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/community/search");
  };
  return (
    <>
      <Div>
        <div className="listWrapper">
          <Row className="first">
            <Container style={{ padding: 0 }}>
              <ButtonGroup>
                <ButtonWrapper>
                  {radios.map((radio) => (
                    <SortButton
                      key={`toggle-${radio.value}`}
                      value={radio.value}
                      onClick={handleToggleChange}
                      sortState={sortState}
                    >
                      {radio.name}
                    </SortButton>
                  ))}
                </ButtonWrapper>
                <ButtonWrapper>
                  <button className="side-btn" onClick={handleSearchClick}>
                    <span className="pe-7s-search"></span>
                  </button>
                  <button className="side-btn" onClick={handlePostClick}>
                    새 글 작성
                  </button>
                </ButtonWrapper>
              </ButtonGroup>
            </Container>
          </Row>
          <Row className="second" style={{ width: "90%" }}>
            <Container style={{ width: "100%" }}>
              <CommunityPostList sortState={sortState} />
            </Container>
          </Row>
        </div>
      </Div>
    </>
  );
};

export default CommunityPage;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 10px;
  height: 100%;

  .sidebarWrapper {
    position: fixed;
  }
  .listWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .first {
    width: 100%;
  }

  .second {
    height: 100%;
    margin: 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.subGrayColor};
  }
`;

const Row = styled.div`
  display: flex;
  // margin: -1rem;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 8px 0 8px 0;
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.subGrayColor};
  position: relative;
  padding: 3px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    align-self: baseline;
    font-size: 2vw;
    font-weight: bold;
  }

  .side-btn {
    background: none;
    border-radius: 5px;
    font-size: 1.2vw;

    &:hover {
      font-weight: bold;
      color: white;
      background: ${({ theme }) => theme.mainColor};
    }
  }
`;

const SortButton = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  margin: 0 0.2rem;
  background: ${(props) =>
    props.sortState === props.value ? props.theme.mainColor : "none"};
  color: ${(props) => (props.sortState === props.value ? "white" : "black")};
  font-size: 1vw;
  font-weight: bold;
  cursor: pointer;
`;
