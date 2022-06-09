import React from "react";
import { Card, Button } from "react-bootstrap";

const BookmarkCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>title</Card.Title>
        <Card.Text>text</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default BookmarkCard;
