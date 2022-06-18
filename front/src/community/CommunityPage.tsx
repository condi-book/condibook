import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import CommunityPostList from "./CommunityPostList";
import SideBar from "../layout/SideBar";

export interface PostPreview {
  id: string;
  author: string;
  created_at: Date;
  title: string;
  content: string;
  views: number;
}

const CommunityPage = () => {
  const navigate = useNavigate();
  const [sortState, setSortState] = useState<string>("newest");

  const radios = React.useMemo(
    () => [
      { name: "최신순", value: "newest" },
      { name: "인기순", value: "popular" },
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
  return (
    <Div>
      <div className="sidebarWrapper">
        <SideBar />
      </div>
      <div className="listWrapper">
        <Row>
          <Container>
            <ButtonGroup>
              <ButtonWrapper>
                {radios.map((radio) => (
                  <button
                    key={`toggle-${radio.value}`}
                    value={radio.value}
                    onClick={handleToggleChange}
                  >
                    {radio.name}
                  </button>
                ))}
              </ButtonWrapper>
              <ButtonWrapper>
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
    margin-left: 130px;
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
  position: relative;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
