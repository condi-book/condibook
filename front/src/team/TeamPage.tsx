import React from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from "react-router-dom";

import * as Api from "../api";
import SideBar from "../layout/SideBar";
import TeamSidebar from "./TeamSidebar";
import TeamCreateModal from "./TeamCreateModal";
import TeamUserModal from "./TeamUserModal";
import { KeyboardContext } from "../App";
import TeamFolderModal from "./TeamFolderModal";

type ContextType = {
  team: Team;
  teams: Team[];
  folders: Folder[];
  selectedFolder?: Folder;
  setTeam: (team: Team) => void;
  setFolders: (folders: Folder[]) => void;
  fetchTeamData: () => Promise<void>;
  fetchTeamFolderData: (id?: number) => Promise<void>;
  setFolderModalShow: (show: boolean) => void;
};
export interface Team {
  team_id: number;
  name: string;
  explanation: string;
  manager_id: number;
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
  const [teams, setTeams] = React.useState<Team[]>(null); // 사용자 팀목록
  const [folders, setFolders] = React.useState<Folder[]>(null);
  const [selectedFolder, setSelectedFolder] = React.useState<Folder>(null);
  // Modal들 state 리팩토링 필요
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [userModalShow, setUserModalShow] = React.useState(false);
  const [folderModalShow, setFolderModalShow] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isBanish, setIsBanish] = React.useState(false);

  const fetchTeamData = async () => {
    try {
      const res = await Api.get("user/teams");
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTeamFolderData = async (id?: number) => {
    try {
      if (team?.team_id === null || team?.team_id === undefined) {
        return;
      }
      const url = id ? `teams/${id}/folders` : `teams/${team?.team_id}/folders`;

      const res = await Api.get(url);
      setFolders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchTeamData();
  }, []);

  React.useEffect(() => {
    fetchTeamData();
    fetchTeamFolderData();
  }, [team]);

  React.useEffect(() => {
    if (team?.team_id === null || team?.team_id === undefined) {
      return;
    }
    fetchTeamFolderData();

    return () => {
      setFolders(null);
    };
  }, [team?.team_id]);

  return (
    <Div>
      {keyboardContext.sidebar === true && <SideBar />}
      <div className="team-section">
        <div className="team-wrap">
          <TeamSidebar
            setCreateModalShow={setCreateModalShow}
            setUserModalShow={setUserModalShow}
            setIsEdit={setIsEdit}
            setIsBanish={setIsBanish}
            setFolderModalShow={setFolderModalShow}
            team={team}
            setTeam={setTeam}
            teams={teams}
            folders={folders}
            setFolders={setFolders}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            fetchTeamFolderData={fetchTeamFolderData}
          />
          <div className="team-container">
            {!team && (
              <NotFound>
                <img src="/static/img/team.svg"></img>
                <div>팀을 생성하여 그룹 북마크를 공유하세요</div>
              </NotFound>
            )}
            <Outlet
              context={{
                team,
                teams,
                folders,
                selectedFolder,
                setTeam,
                setFolders,
                fetchTeamData,
                fetchTeamFolderData,
                setFolderModalShow,
              }}
            />
            <TeamCreateModal
              createModalShow={createModalShow}
              setCreateModalShow={setCreateModalShow}
              team={team}
              setTeam={setTeam}
              isEdit={isEdit}
              fetchTeamData={fetchTeamData}
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
              fetchTeamFolderData={fetchTeamFolderData}
            />
          </div>
        </div>
      </div>
    </Div>
  );
};

export default TeamPage;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  background: #eff6fc;

  .team-section {
    width: 100%;
    padding: 10px 10px 10px 0;
    display: flex;
  }
  .team-wrap {
    width: 100%;

    background: white;
    border-radius: 10px;
    display: flex;
    padding: 10px;
  }

  .team-container {
    margin: auto;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    background: #f5f5f5;
    border-radius: 10px;
  }
`;

const NotFound = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 20%;
    margin-bottom: 20px;
  }
`;

export const useOutletContextProps = () => {
  return useOutletContext<ContextType>();
};
