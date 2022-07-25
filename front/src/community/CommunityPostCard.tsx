import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { PostPreview } from "./CommunityPage";
import CalcDate from "./tools/CalcDate";

const removeMD = require("remove-markdown");
interface CommunityPostCardProps {
  PostPreview: PostPreview;
}

const CommunityPostCard = ({ PostPreview }: CommunityPostCardProps) => {
  const navigate = useNavigate();
  const createdTime = CalcDate(new Date(PostPreview.createdAt));

  const handleDetailClick = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`/community/${PostPreview.id}`);
  }, []);

  return (
    <Card onClick={handleDetailClick}>
      <CardBody>
        <CardTitle>{PostPreview.title}</CardTitle>
        <CardinfoText>
          <span>{createdTime}</span>
          <span>{`조회수 ${PostPreview.views} 회`}</span>
        </CardinfoText>
        <CardContent>{removeMD(PostPreview.content)}</CardContent>
      </CardBody>
      <CardFooter>
        <div className="userInfo">
          <b>{PostPreview.author_name}</b>
        </div>
        <div className="likes">
          <span className="pe-7s-like like"></span>
          <p>{PostPreview.like_counts}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityPostCard;

const Card = styled.div`
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 0.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 14rem;
  height: 15rem;
  .imgWrapper {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;
const CardTitle = styled.h4`
  font-size: 1rem;
  margin: 0px 0px 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
`;
const CardContent = styled.div`
  font-size: 0.8rem;
  margin-top: 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: revert;
  overflow: hidden;
  height: 6.2rem;
  overflow-wrap: break-word;
`;
const CardinfoText = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
`;
const CardFooter = styled.div`
  padding: 0.2rem 1rem;
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  justify-content: space-between;

  .userInfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    // align-items: center;
  }
  .likes {
    display: flex;
    flex-direction: row;
  }
  .like {
    width: 100%;
    height: 100%;
    margin-right: 0.5rem;
    font-size: 20px;
    color: ${({ theme }) => theme.subRedColor};
    font-weight: bold;
  }
`;
