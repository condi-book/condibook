import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "../layout/SideBar";
import TeamSidebar from "./TeamSidebar";
import TeamCreateModal from "./TeamCreateModal";
import TeamInviteModal from "./TeamInviteModal";
import { KeyboardContext } from "../App";

export interface Team {
  team_id: number;
  name: string;
  explanation: string;
}

const TeamPage = () => {
  const keyboardContext: any = React.useContext(KeyboardContext);
  const [team, setTeam] = React.useState<Team>(null);
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [inviteModalShow, setInviteModalShow] = React.useState(false);

  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <TeamSidebar
        setCreateModalShow={setCreateModalShow}
        setInviteModalShow={setInviteModalShow}
        setTeam={setTeam}
      />
      <div className="team-container">
        <Outlet />
        <TeamCreateModal
          createModalShow={createModalShow}
          setCreateModalShow={setCreateModalShow}
          setTeam={setTeam}
        />
        <TeamInviteModal
          inviteModalShow={inviteModalShow}
          setInviteModalShow={setInviteModalShow}
          team={team}
        />
      </div>
    </Div>
  );
};

export default TeamPage;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  background: #f8f9fc;
  height: 100vh;
  height: auto;

  .team-container {
    display: flex;
    margin: auto;
    width: 90vw;
    height: 100%;
  }
`;
