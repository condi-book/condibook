import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
// import * as Api from "../api";

interface props {
  isModalShow: boolean;
  setIsModalShow: (isModalShow: boolean) => void;
  bookmarks: string[];
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
}
const AddBookMarkModal = ({
  isModalShow,
  setIsModalShow,
  bookmarks,
  setBookmarks,
}: props) => {
  const [newLink, setNewLink] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setBookmarks([...bookmarks, newLink]);
      setNewLink("");
    }
  };
  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setBookmarks([...bookmarks, newLink]);
  };

  const handleClickRemove =
    (idx: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setBookmarks(bookmarks.filter((_, i) => i !== idx));
    };
  return (
    <>
      <Modal
        size="lg"
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            북마크 등록
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Row>
              <Col>
                {bookmarks.map((bookmark, idx) => (
                  <Row key={`postBookmark-${idx}`}>
                    <span>{bookmark}</span>
                    <button onClick={handleClickRemove(idx)}>X</button>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Input
                value={newLink}
                onChange={handleChange}
                placeholder="북마크를 입력해주세요"
                onKeyPress={handleKeyPress}
              ></Input>
              <button onClick={handleClickAdd}>
                <span>등록</span>
              </button>
            </Row>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBookMarkModal;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;

  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;
  &:focus {
    outline: none;
  }
`;
