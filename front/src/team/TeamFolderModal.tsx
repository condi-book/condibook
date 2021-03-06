import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Team } from "./TeamPage";
import * as Api from "../api";
import { Alert } from "../layout/Alert";
import { AxiosError } from "axios";

interface Props {
  folderModalShow: boolean;
  setFolderModalShow: (show: boolean) => void;
  team: Team;
  fetchTeamFolderData: () => Promise<void>;
}

const TeamFolderModal = ({
  folderModalShow,
  setFolderModalShow,
  team,
  fetchTeamFolderData,
}: Props) => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");

  const validateTitle = () => {
    if (title === "") {
      return "제목을 입력해주세요.";
    }
    if (title.length > 20) {
      return "제목은 20자 이내로 입력해주세요.";
    }
  };

  const handleCreateFolder = async () => {
    const validateMessage = validateTitle();
    if (validateMessage) {
      return Alert.fire({
        icon: "error",
        title: validateMessage,
      });
    }

    try {
      const res = await Api.post(`folders?owner=team`, {
        team_id: team.team_id,
        title,
      });
      console.log(res.data);

      setFolderModalShow(false);
      fetchTeamFolderData();
      navigate(res.data.id);
      Alert.fire({
        icon: "success",
        title: "폴더 생성 성공",
      });
    } catch (err) {
      const error = err as AxiosError;
      await Alert.fire({
        icon: "error",
        title: "폴더 생성 실패" + error.response?.data,
      });
    }
  };
  return (
    <>
      <Modal
        show={folderModalShow}
        onHide={() => setFolderModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            폴더 생성
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!team ? (
            <InputContainer style={{ textAlign: "center" }}>
              <span>폴더를 생성하기 위해 팀을 선택해주세요</span>
            </InputContainer>
          ) : (
            <InputContainer>
              <InputLabel>폴더명</InputLabel>
              <FolderInput
                type="text"
                placeholder="폴더명을 입력해주세요"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </InputContainer>
          )}
        </Modal.Body>
        {!team ? (
          <Modal.Footer>
            <button onClick={() => setFolderModalShow(false)}>나가기</button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <button onClick={() => setFolderModalShow(false)}>취소</button>
            <button onClick={handleCreateFolder}>생성</button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default TeamFolderModal;

const FolderInput = styled.input`
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
