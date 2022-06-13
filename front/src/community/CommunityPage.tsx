import React, { useState } from "react";
import { Container, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import CommunityPostList from "./CommunityPostList";

export interface PostPreview {
  id: string;
  user_id: string;
  created_at: Date;
  title: string;
  description: string;
  like: number;
}

const CommunityPage = () => {
  const [sortState, setSortState] = useState<string>("newest");

  const radios = React.useMemo(
    () => [
      { name: "최신순", value: "newest" },
      { name: "인기순", value: "popular" },
    ],
    [],
  );

  const handleToggleChange = React.useCallback((event: React.ChangeEvent) => {
    const { value } = event.currentTarget as HTMLInputElement;
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
            <CommunityPostList sortState={sortState} />
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default CommunityPage;
