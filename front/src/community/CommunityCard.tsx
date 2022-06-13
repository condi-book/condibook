import React from "react";
import { Card, Button } from "react-bootstrap";
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

    navigate(`/${PostPreview.user_id}/${PostPreview.id}`);
  }, []);

  return (
    <Card className="text-center">
      <Card.Header>{PostPreview.user_id}</Card.Header>
      <Card.Body>
        <Card.Title>{PostPreview.title}</Card.Title>
        <Card.Text>{PostPreview.description}</Card.Text>
        <Button variant="primary" onClick={handleDetailClick}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CommunityCard;
