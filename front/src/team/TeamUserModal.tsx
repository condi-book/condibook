import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { Team } from "./TeamPage";
import * as Api from "../api";
import { getCookie } from "auth/util/cookie";
import { Alert } from "../layout/Alert";
import { AxiosError } from "axios";

interface Props {
  userModalShow: boolean;
  setUserModalShow: (show: boolean) => void;
  team: Team;
  isBanish: boolean;
}

type StyleProps = {
  styleID: number;
  selectedUserID: number;
  isManager: boolean;
};

const TeamUserModal = ({
  userModalShow,
  setUserModalShow,
  team,
  isBanish,
}: Props) => {
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [searchedUsers, setSearchedUsers] = React.useState<any[]>([]);
  const [selectedUserID, setSelectedUserID] = React.useState(null);

  const userID = getCookie("user")?.id;
  const managerID = team?.manager_id;

  const { teamid } = useParams();

  const makeHiddenEmail = (email: string, index: number) => {
    return email.substring(0, index - 6) + "*******" + email.substring(index);
  };

  const handleSelectUser =
    (id: number) =>
    (e: React.MouseEvent<Element>): void => {
      e.preventDefault();

      const user = searchedUsers.find((user) => {
        if (isBanish) {
          return user.user_id === id;
        }
        return user.id === id;
      });
      setEmail(user?.email);
      setSelectedUserID(user.id ?? user.user_id);
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
      setUserModalShow(false);
    } catch (err) {
      const error = err as AxiosError;
      Alert.fire({
        icon: "error",
        title: "초대 실패 " + error.response?.data,
      });
    }
  };

  const handleBanish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (selectedUserID === managerID) {
        return await Alert.fire({
          icon: "error",
          title: "매니저는 추방 할 수 없습니다.",
        });
      }
      await Api.delete(`teams/${team.team_id}/members/${selectedUserID}`);
      await Alert.fire({
        icon: "success",
        title: "추방 성공",
      });
      setUserModalShow(false);
    } catch (err) {
      const error = err as AxiosError;
      Alert.fire({
        icon: "error",
        title: "추방 실패 " + error.response?.data,
      });
    }
  };

  const handleUserSearch = async () => {
    try {
      const teamMembers = await Api.get(`teams/${team.team_id}/members`);
      if (isBanish) {
        setSearchedUsers(teamMembers.data);
      } else {
        const res = await Api.get(`user?nickname=${nickname}`);
        const allUser = res.data;
        const searchUsersExceptTeamMembersAndMe = allUser.filter(
          (user: any) =>
            teamMembers.data.find(
              (teamUser: any) => teamUser.user_id === user.id,
            ) === undefined && user.id !== userID,
        );

        setSearchedUsers(searchUsersExceptTeamMembersAndMe);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const teamMembers = await Api.get(
        `teams/${team?.team_id ?? teamid}/members`,
      );
      if (isBanish) {
        setSearchedUsers(teamMembers.data);
      } else {
        const res = await Api.get(`user?nickname=${nickname}`);
        const allUser = res.data;
        const searchUsersExceptTeamMembersAndMe = allUser.filter(
          (user: any) =>
            teamMembers.data.find(
              (teamUser: any) => teamUser.user_id === user.id,
            ) === undefined && user.id !== userID,
        );

        setSearchedUsers(searchUsersExceptTeamMembersAndMe);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userSearchList = searchedUsers.map((user) => {
    const hiddenEmail = makeHiddenEmail(user.email, user.email.indexOf("@"));
    return (
      <UserCard
        key={`user-${user.id ?? user.user_id}`}
        styleID={user.id ?? user.user_id}
        onClick={handleSelectUser(user.id ?? user.user_id)}
        selectedUserID={selectedUserID}
        isManager={(user.id ?? user.user_id) === managerID}
      >
        <span className="userNickname">{user.nickname}</span>
        <span className="separator">|</span>
        <span className="email">{hiddenEmail}</span>
        <span className="separator">|</span>
        {(user.id ?? user.user_id) === managerID ? (
          <span className="manager">매니저</span>
        ) : (
          <span className="member">회원</span>
        )}
      </UserCard>
    );
  });

  React.useEffect(() => {
    fetchUserData();
  }, [userModalShow]);

  React.useEffect(() => {
    emailjs.init("rCd7LLcggPr8C3K0N");
  }, []);

  return (
    <>
      {team !== null ? (
        <Modal
          show={userModalShow}
          onHide={() => setUserModalShow(false)}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isBanish ? "팀 유저 정보" : "팀 초대"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isBanish && (
              <Row>
                <NickNameInput
                  type="text"
                  value={nickname}
                  placeholder="유저의 닉네임을 검색해주세요"
                  onChange={(e) => setNickname(e.target.value)}
                />
                <ButtonContainer>
                  <button onClick={handleUserSearch}>
                    <span className="pe-7s-search"></span>
                  </button>
                </ButtonContainer>
              </Row>
            )}
            <UserListContainer>
              {searchedUsers.length > 0 && userSearchList}
            </UserListContainer>
          </Modal.Body>
          <Modal.Footer>
            {isBanish ? (
              <button onClick={handleBanish}>추방</button>
            ) : (
              <button onClick={handleInvite}>초대</button>
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={userModalShow}
          onHide={() => setUserModalShow(false)}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isBanish ? "팀 유저 정보" : "팀 초대"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <span>
              {isBanish
                ? "정보를 보기 위해 우선 팀을 선택해주세요"
                : "초대하기 위해 우선 팀을 선택해주세요"}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setUserModalShow(false)}>나가기</button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TeamUserModal;

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
    margin-right: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }
  .email {
    font-size: 0.8rem;
    margin-right: 1rem;
  }
  .manager {
    font-size: 1rem;
    font-weight: bold;
  }
  .separator {
    margin-right: 1rem;
  }
`;

const UserCard = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  border-radius: 0.25rem;
  background: ${({ styleID, selectedUserID, isManager, theme }) =>
    isManager
      ? theme.profileBackground
      : styleID === selectedUserID && !isManager
      ? "black"
      : "white"};
  color: ${({ isManager, styleID, selectedUserID }) =>
    isManager
      ? "#fff"
      : styleID === selectedUserID && !isManager
      ? "white"
      : "black"};
  border: 1px solid #ced4da;
  margin-bottom: 0.5rem;
  cursor: ${({ isManager }) => (isManager ? "default" : "pointer")};

  :hover {
    background-color: ${(props) => (props.isManager ? "white" : "black")};
    color: white;
  }
`;
