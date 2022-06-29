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
          <Row>
            <Container>
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
                  <button onClick={handleSearchClick}>
                    <span className="pe-7s-search"></span>
                  </button>
                  <button onClick={handlePostClick}>새 글 작성</button>
                </ButtonWrapper>
              </ButtonGroup>
            </Container>
          </Row>
          <Row>
            <Container>
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
  background: #f8f9fc;

  .sidebarWrapper {
    position: fixed;
  }
  .listWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
  }
`;

const Row = styled.div`
  display: flex;
  margin: -1rem;
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
  position: relative;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    align-self: baseline;
    font-size: 20px;
    font-weight: bold;
  }
`;

const SortButton = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 0.2rem;
  background: ${(props) =>
    props.sortState === props.value ? "black" : "white"};
  color: ${(props) => (props.sortState === props.value ? "white" : "black")};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
