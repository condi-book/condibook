import React from "react";
import { Card, Button } from "react-bootstrap";
import { Bookmark } from "./CommunityPage";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const CommunityCard = ({ bookmark }: BookmarkCardProps) => {
  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>{bookmark.meta_title}</Card.Title>
        <Card.Text>{bookmark.meta_description}</Card.Text>
        <Button variant="primary">Detail</Button>
      </Card.Body>
    </Card>
  );
};

export default CommunityCard;
