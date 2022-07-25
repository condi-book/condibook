import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContextProps } from "./TeamPage";
import TeamPageFolderCard from "./TeamPageFolderCard";
import * as Api from "../api";
import { Alert, warningAlert } from "../layout/Alert";
// import { AxiosError } from "axios";
import { getCookie } from "../auth/util/cookie";

const TeamPageMain = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    team,
    teams,
    folders,

    setTeam,
    fetchTeamFolderData,
    // setFolderModalShow,
  } = useOutletContextProps();
  // const handleClickCreate = async () => {
  //   setFolderModalShow(true);
  //   await fetchTeamFolderData();
  // };
  const managerID = team?.manager_id;
  const userID = getCookie("user")?.id;

  const handleDeleteTeam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userID !== managerID) {
      console.log("삭제 권한이 없습니다.");
      return Alert.fire({
        icon: "error",
        title: "삭제 권한이 없습니다.",
      });
    }
    warningAlert(e, "해당 폴더를 삭제하시겠습니까?", async () => {
      await Api.delete(`teams/${team.team_id}`);
      setTeam(null);
      await Alert.fire({
        icon: "success",
        title: "팀 삭제 성공",
      });
      await fetchTeamFolderData();
      navigate("/team");
    });
  };

  const fetchUpdateData = async () => {
    await fetchTeamFolderData();
    const result = teams?.find(
      (team) => team.team_id === parseInt(params.teamid),
    );
    setTeam(result);
  };

  React.useEffect(() => {
    if (params.teamid) {
      fetchUpdateData();
    } else {
      fetchTeamFolderData();
    }
  }, []);

  return (
    <Div>
      <Col>
        <Row>
          <h4
            style={{
              display: "flex",
              marginBottom: "0",
              marginTop: "0",
              fontWeight: "bold",
            }}
          >
            {team?.name}
          </h4>
          {userID === managerID && (
            <Button onClick={handleDeleteTeam}>팀 삭제</Button>
          )}
        </Row>
        <h6>{team?.explanation}</h6>
      </Col>
      <FolderContainer>
        {/* <div className="create-card" onClick={handleClickCreate}>
          <span className="pe-7s-plus" />
        </div> */}
        {folders?.map((folder, index) => (
          <TeamPageFolderCard
            folder={folder}
            key={`folder-${index}`}
            onClick={() => navigate(`/team/${team.team_id}/${folder.id}`)}
            fetchTeamFolderData={fetchTeamFolderData}
          />
        ))}
      </FolderContainer>
    </Div>
  );
};

export default TeamPageMain;

const Div = styled.div`
  border-radius: 10px;
  background: #f5f5f5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  .create-card {
    border-radius: 7px;
    background: white;
    margin: 0.833%;
    padding: 10px;
    width: 15%;
    box-sizing: border-box;
    height: 25vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    .pe-7s-plus {
      font-size: 3rem;
    }
  }
`;

// const Col = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  flex: 1;

  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  margin-left: 1rem;
  border-radius: 10px;
  background: red;
  color: white;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const FolderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  margin: 0.833%;
  padding: 10px;
  background: rgb(235, 235, 235);
  border-radius: 10px;
  align-content: flex-start;
`;
