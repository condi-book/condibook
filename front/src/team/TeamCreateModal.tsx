import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import * as Api from "../api";
import { Team } from "./TeamPage";
import { Alert } from "../layout/Alert";

interface Props {
  createModalShow: boolean;
  setCreateModalShow: (show: boolean) => void;
  setTeam: (team: Team) => void;
}

const TeamCreateModal = ({
  createModalShow,
  setCreateModalShow,
  setTeam,
}: Props) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [explanation, setExplanation] = React.useState("");

  const handleCreateTeam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await Api.post("teams", {
        name,
        explanation,
      });
      console.log(res);
      setCreateModalShow(false);
      setTeam({
        team_id: res.data.id,
        name: res.data.name,
        explanation: res.data.explanation,
      });
      await Alert.fire({
        icon: "success",
        title: "팀 생성 성공",
      });
      navigate(`/team/${res.data.id}`);
    } catch (err) {
      console.log(err);
      await Alert.fire({
        icon: "error",
        title: "팀 생성 실패",
      });
    }
  };
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
            <TeamInput
              type="text"
              placeholder="팀 이름"
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <TeamInput
              type="text"
              placeholder="팀 설명"
              onChange={(e) => setExplanation(e.target.value)}
            />
          </InputContainer>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCreateTeam}>생성</button>
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
