import React from "react";
import { Card, Button } from "react-bootstrap";
import { PostPreview } from "./CommunityPage";
import { useNavigate } from "react-router-dom";

interface CommunityCardProps {
  PostPreview: PostPreview;
}

const CommunityCard = ({ PostPreview }: CommunityCardProps) => {
  const navigate = useNavigate();

  const handleDetailClick = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`Detail/${PostPreview.id}`);
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
