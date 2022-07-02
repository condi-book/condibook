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
  team: Team;
  setTeam: (team: Team) => void;
  isEdit: boolean;
  fetchTeamData: () => void;
}

const TeamCreateModal = ({
  createModalShow,
  setCreateModalShow,
  team,
  setTeam,
  isEdit,
  fetchTeamData,
}: Props) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [explanation, setExplanation] = React.useState("");

  const handleCreateTeam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name === "" || explanation === "") {
      return Alert.fire({
        icon: "error",
        title: "입력되지 않은 항목이 있습니다.",
      });
    }
    if (name.length > 20 || explanation.length > 50) {
      return Alert.fire({
        icon: "error",
        title: "제목은 20자 내외 \n 설명은 50자 내외입니다.",
      });
    }
    try {
      const res = await Api.post("teams", {
        name,
        explanation,
      });
      setCreateModalShow(false);
      setTeam({
        team_id: res.data.id,
        name: res.data.name,
        explanation: res.data.explanation,
        manager_id: res.data.manager_id,
      });
      await Alert.fire({
        icon: "success",
        title: "팀 생성 성공",
      });
      fetchTeamData();
      navigate(`/team/${res.data.id}`);
    } catch (err) {
      await Alert.fire({
        icon: "error",
        title: "팀 생성 실패",
      });
    }
  };

  const handleEditTeam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name === "" || explanation === "") {
      return Alert.fire({
        icon: "error",
        title: "입력되지 않은 항목이 있습니다.",
      });
    }
    if (name.length > 20 || explanation.length > 50) {
      return Alert.fire({
        icon: "error",
        title: "제목은 20자 내외 \n 설명은 50자 내외입니다.",
      });
    }
    try {
      await Api.put(`teams/${team.team_id}/info`, {
        name,
        explanation,
      });
      setCreateModalShow(false);
      setTeam({
        team_id: team.team_id,
        name,
        explanation,
        manager_id: team.manager_id,
      });
      await Alert.fire({
        icon: "success",
        title: "팀 수정 성공",
      });
      navigate(`/team/${team.team_id}`);
    } catch (err: any) {
      await Alert.fire({
        icon: "error",
        title: `팀 수정 실패 : ${err?.response.data}`,
      });
    }
  };

  const setTeamData = () => {
    setName(team?.name);
    setExplanation(team?.explanation);
  };

  React.useEffect(() => {
    if (isEdit) {
      setTeamData();
    } else {
      setName("");
      setExplanation("");
    }
  }, [isEdit, team]);

  React.useEffect(() => {
    if (createModalShow) {
      setTeamData();
    }
  }, [createModalShow, team]);
  return (
    <>
      <Modal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "팀 수정" : "팀 생성"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEdit && !team ? (
            <div style={{ textAlign: "center" }}>
              수정 하기 위해 팀을 선택해주세요
            </div>
          ) : (
            <div>
              <InputContainer>
                <InputLabel>팀명</InputLabel>
                <TeamInput
                  type="text"
                  placeholder="팀명을 입력해주세요"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>팀 설명</InputLabel>
                <TeamInput
                  type="text"
                  placeholder="팀 설명을 입력해주세요"
                  onChange={(e) => setExplanation(e.target.value)}
                  value={explanation}
                />
              </InputContainer>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEdit ? (
            !team ? (
              <button onClick={() => setCreateModalShow(false)}>나가기</button>
            ) : (
              <button onClick={handleEditTeam}>수정</button>
            )
          ) : (
            <button onClick={handleCreateTeam}>생성</button>
          )}
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

const InputLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
