import React from "react";
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
  const [sortState, setSortState] = React.useState<string>("newest");
  const radios = React.useMemo(
    () => [
      { name: "최신순", value: "newest" },
      { name: "인기순", value: "popular" },
    ],
    [],
  );

  const handleToggleChange = React.useCallback((e: React.ChangeEvent) => {
    const { value } = e.currentTarget as HTMLInputElement;
    setSortState(value);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Container>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={`toggle-${idx}`}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-success"}
                  name="radio"
                  value={radio.value}
                  checked={sortState === radio.value}
                  onChange={handleToggleChange}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Container>
        </Row>
        <Row>
          <Container>
            <BookmarkList />
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default CommunityPage;
