import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { Team } from "./TeamPage";
import * as Api from "../api";
import { Alert } from "../layout/Alert";

interface Props {
  inviteModalShow: boolean;
  setInviteModalShow: (show: boolean) => void;
  team: Team;
}

type StyleProps = {
  styleID: number;
  selectedUserID: number;
};

const TeamInviteModal = ({
  inviteModalShow,
  setInviteModalShow,
  team,
}: Props) => {
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [searchedUsers, setSearchedUsers] = React.useState<any[]>([]);
  const [selectedUserID, setSelectedUserID] = React.useState(null);

  const makeHiddenEmail = (email: string, index: number) => {
    return email.substring(0, index - 6) + "*******" + email.substring(index);
  };

  const handleSelectUser =
    (id: number) =>
    (e: React.MouseEvent<Element>): void => {
      e.preventDefault();
      const user = searchedUsers.find((user) => user.id === id);
      setEmail(user?.email);
      setSelectedUserID(user?.id);
    };

  const handleInvite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Api.post(`teams/${team.team_id}/members`, {
        invitee_id: selectedUserID,
      });
      const template = {
        teamName: team.name,
        userEmail: email,
      };
      await emailjs.send("service_v7ltb16", "template_92v5kp9", template);
      await Alert.fire({
        icon: "success",
        title: "초대 성공",
      });
    } catch (err) {
      console.log(err);
      Alert.fire({
        icon: "error",
        title: "초대 실패",
      });
    }
  };

  const handleUserSearch = async () => {
    try {
      const res = await Api.get(`user?nickname=${nickname}`);
      console.log(res);
      setSearchedUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const userSearchList = searchedUsers.map((user) => {
    const hiddenEmail = makeHiddenEmail(user.email, user.email.indexOf("@"));
    return (
      <UserCard
        key={`user-${user.id}`}
        styleID={user.id}
        onClick={handleSelectUser(user.id)}
        selectedUserID={selectedUserID}
      >
        <span className="userNickname">{user.nickname}</span>
        <span className="separator">|</span>
        <span>{hiddenEmail}</span>
      </UserCard>
    );
  });

  React.useEffect(() => {
    emailjs.init("rCd7LLcggPr8C3K0N");
  }, []);

  return (
    <>
      {team !== null ? (
        <Modal
          show={inviteModalShow}
          onHide={() => setInviteModalShow(false)}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>팀 초대</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <NickNameInput
                type="text"
                value={nickname}
                placeholder="초대하실 유저의 닉네임을 검색해주세요"
                onChange={(e) => setNickname(e.target.value)}
              />
              <ButtonContainer>
                <button onClick={handleUserSearch}>
                  <span className="pe-7s-search"></span>
                </button>
              </ButtonContainer>
            </Row>
            <UserListContainer>
              {searchedUsers.length > 0 && userSearchList}
            </UserListContainer>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleInvite}>초대</button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={inviteModalShow}
          onHide={() => setInviteModalShow(false)}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>팀 초대</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>팀을 선택해 주세요</span>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setInviteModalShow(false)}>나가기</button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TeamInviteModal;

const NickNameInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  flex: 2;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  span {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #black;
  border-radius: 0.25rem;
  background-color: #fff;
  overflow-y: scroll;
  height: 300px;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  .userNickname {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
  }
  .separator {
    margin-right: 2rem;
  }
`;

const UserCard = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) =>
    props.styleID === props.selectedUserID ? "#ffeecb" : "white"};
  border: 1px solid #ced4da;
  margin-bottom: 0.5rem;
  cursor: pointer;

  :hover {
    background-color: #ffeecb;
  }
`;
