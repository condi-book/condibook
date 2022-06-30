import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "../layout/SideBar";
import TeamSidebar from "./TeamSidebar";
import TeamCreateModal from "./TeamCreateModal";
import TeamUserModal from "./TeamUserModal";
import { KeyboardContext } from "../App";
import TeamFolderModal from "./TeamFolderModal";

export interface Team {
  team_id: number;
  name: string;
  explanation: string;
}

export interface Folder {
  bookmark_count: number;
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  favorites: boolean;
  first_bookmark_url: string;
}
const TeamPage = () => {
  const keyboardContext: any = React.useContext(KeyboardContext);
  const [team, setTeam] = React.useState<Team>(null);
  const [selectedFolder, setSelectedFolder] = React.useState<Folder>(null);
  // 이후에 Modal 종류를 string으로 받아 switch case 문으로 컴포넌트를 분류하도록 리팩토링
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [userModalShow, setUserModalShow] = React.useState(false);
  const [folderModalShow, setFolderModalShow] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isBanish, setIsBanish] = React.useState(false);

  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <TeamSidebar
        setCreateModalShow={setCreateModalShow}
        setUserModalShow={setUserModalShow}
        setIsEdit={setIsEdit}
        setIsBanish={setIsBanish}
        setFolderModalShow={setFolderModalShow}
        team={team}
        setTeam={setTeam}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <div className="team-container">
        <Outlet />
        <TeamCreateModal
          createModalShow={createModalShow}
          setCreateModalShow={setCreateModalShow}
          team={team}
          setTeam={setTeam}
          isEdit={isEdit}
        />
        <TeamUserModal
          userModalShow={userModalShow}
          setUserModalShow={setUserModalShow}
          team={team}
          isBanish={isBanish}
        />
        <TeamFolderModal
          folderModalShow={folderModalShow}
          setFolderModalShow={setFolderModalShow}
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
