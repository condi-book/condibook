import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { PostPreview } from "./CommunityPage";
import CalcDate from "./tools/CalcDate";

interface CommunityPostCardProps {
  PostPreview: PostPreview;
}

const CommunityPostCard = ({ PostPreview }: CommunityPostCardProps) => {
  const navigate = useNavigate();
  const URL = "/static/img/dog.jpg";
  const createdTime = CalcDate(PostPreview.created_at);

  //이후에 버튼이 아닌 title과 description 클릭시 이동으로 변경
  const handleDetailClick = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`/community/${PostPreview.id}`);
  }, []);

  return (
    <Card onClick={handleDetailClick}>
      <CardHeader>
        <Img src={URL} alt={`previewImg-${PostPreview.id}`} />
      </CardHeader>
      <CardBody>
        <CardTitle>{PostPreview.title}</CardTitle>
        <CardText>{PostPreview.content}</CardText>
        <CardinfoText>
          <span>{createdTime}</span>
        </CardinfoText>
      </CardBody>
      <CardFooter>
        <div className="userInfo">
          <b>{PostPreview.author}</b>
        </div>
        <div className="liks">
          <span className="pe-7s-like like"></span>100
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
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .imgWrapper {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const CardHeader = styled.div`
  position: relative;
  align-items: center;
  width: 120px;
  height: 120px;
  overflow: hidden;
  align-self: center;
`;

const Img = styled.img`
  position: absolute;
  left: 25px
  width: 100%;
  height: 100%;
  display: block;
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
const CardText = styled.p`
  margin: 0px 0px 1.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  height: 3.9375rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CardinfoText = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
`;
const CardFooter = styled.div`
  padding: 0.625rem 1rem;
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  justify-content: space-between;

  .userInfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
  }
  .like {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.5rem;
  }
`;
