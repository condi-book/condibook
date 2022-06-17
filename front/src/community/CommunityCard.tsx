import React from "react";
import { Card } from "react-bootstrap";
import { PostPreview } from "./CommunityPage";
import { useNavigate } from "react-router-dom";

interface CommunityCardProps {
  PostPreview: PostPreview;
}

const CommunityCard = ({ PostPreview }: CommunityCardProps) => {
  const navigate = useNavigate();

  //이후에 버튼이 아닌 title과 description 클릭시 이동으로 변경
  const handleDetailClick = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`/community/${PostPreview.id}`);
  }, []);

  return (
    <Card className="text-center">
      <Card.Header>{PostPreview.author}</Card.Header>
      <Card.Body>
        <Card.Title>{PostPreview.title}</Card.Title>
        <Card.Text>{PostPreview.content}</Card.Text>
        <button onClick={handleDetailClick}>Detail</button>
      </Card.Body>
    </Card>
  );
};

export default CommunityCard;
