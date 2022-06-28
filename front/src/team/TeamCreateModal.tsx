import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
// import * as Api from "../api";

interface Props {
  createModalShow: boolean;
  setCreateModalShow: (show: boolean) => void;
}
const TeamCreateModal = ({ createModalShow, setCreateModalShow }: Props) => {
  return (
    <>
      <Modal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>팀 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputContainer>
            <TeamInput type="text" placeholder="팀 이름" />
          </InputContainer>
          <InputContainer>
            <TeamInput type="text" placeholder="팀 설명" />
          </InputContainer>
        </Modal.Body>
        <Modal.Footer>
          <button>생성</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TeamCreateModal;

const TeamInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;
