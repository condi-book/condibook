import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useOutletContextProps } from "./TeamPage";
import TeamPageFolderCard from "./TeamPageFolderCard";

const TeamPageMain = () => {
  const navigate = useNavigate();
  const { team, folders, fetchTeamFolderData, setFolderModalShow } =
    useOutletContextProps();
  const handleClickCreate = async () => {
    setFolderModalShow(true);
    await fetchTeamFolderData();
  };

  React.useEffect(() => {
    fetchTeamFolderData();
  }, []);

  return (
    <Div>
      <div>
        <h3>{team?.name}</h3>
      </div>
      <div className="create-card" onClick={handleClickCreate}>
        <span className="pe-7s-plus" />
      </div>
      {folders?.map((folder, index) => (
        <TeamPageFolderCard
          folder={folder}
          key={`folder-${index}`}
          onClick={() => navigate(`/team/${team.team_id}/${folder.id}`)}
        />
      ))}
    </Div>
  );
};

export default TeamPageMain;

const Div = styled.div`
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
