import React, { useState, useEffect } from "react";
import { Container, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import BookmarkList from "./BookmarkList";

export interface Bookmark {
  id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  meta_title: string;
  meta_description: string;
}

const CommunityPage = () => {
  const [sortState, setSortState] = useState<string>("newest");

  const radios = [
    { name: "최신순", value: "newest" },
    { name: "인기순", value: "popular" },
  ];

  return (
    <>
      <Container>
        <Row>
          <Container>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-success"}
                  name="radio"
                  value={radio.value}
                  checked={sortState === radio.value}
                  onChange={(e) => setSortState(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Container>
        </Row>
        <Row>
          <Container>
            <BookmarkList sortState={sortState} />
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default CommunityPage;
