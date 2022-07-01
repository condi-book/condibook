import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContextProps } from "./TeamPage";
import TeamPageFolderCard from "./TeamPageFolderCard";

const TeamPageMain = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    team,
    folders,
    fetchTeamData,
    setTeam,
    fetchTeamFolderData,
    // setFolderModalShow,
  } = useOutletContextProps();
  // const handleClickCreate = async () => {
  //   setFolderModalShow(true);
  //   await fetchTeamFolderData();
  // };

  const fetchUpdateData = async () => {
    const res = await fetchTeamData();
    await fetchTeamFolderData();
    const result = res.find((team) => team.team_id === parseInt(params.teamid));
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
      <Row>
        <h4>{team?.name}</h4>
        <h6>{team?.explanation}</h6>
        {/* <h4>{team?.manager}</h4> */}
      </Row>
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
