import React from "react";

import styled from "styled-components";
import { Comment } from "./CommunityPostDetail";
import CalcDate from "./tools/CalcDate";

interface props {
  comments: Comment[];
}

const CommunityPostComments = ({ comments }: props) => {
  return (
    <>
      {comments.map((comment, idx) => (
        <Col key={`comment-${idx}`}>
          <Row>
            <InfoContainer>
              <span className="username">{comment.author_name}</span>
              <span className="separator">|</span>
              <span className="date">
                {CalcDate(new Date(comment?.createdAt))}
              </span>
            </InfoContainer>
          </Row>
          <ContentContainer>
            <p>{comment.content}</p>
          </ContentContainer>
        </Col>
      ))}
    </>
  );
};

export default CommunityPostComments;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const InfoContainer = styled.div`
  align-items: center;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;

  .username {
    font-weight: bold;
  }

  .date {
    font-size: 0.875rem;
    color: #8f9bb3;
  }

  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
