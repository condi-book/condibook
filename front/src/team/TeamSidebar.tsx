import React from "react";
import styled from "styled-components";
import * as Api from "../api";
import { Team, Folder } from "./TeamPage";

type StyleProps = {
  show: boolean;
};

type FolderMoreStyleProps = {
  value: number;
  moreView: number;
};

type FolderContainerStyleProps = {
  value: number;
  editingFolder: number;
  selectedFolder: Folder;
};

interface Props {
  setCreateModalShow: (show: boolean) => void;
  setUserModalShow: (show: boolean) => void;
  setIsBanish: (isBanish: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setFolderModalShow: (show: boolean) => void;
  team: Team;
  setTeam: (team: Team) => void;
  selectedFolder: Folder;
  setSelectedFolder: (folder: Folder) => void;
}

const TeamSidebar = ({
  setCreateModalShow,
  setUserModalShow,
  team,
  setTeam,
  setIsBanish,
  setIsEdit,
  setFolderModalShow,
  selectedFolder,
  setSelectedFolder,
}: Props) => {
  const [teams, setTeams] = React.useState([]); // 사용자 팀목록
  const [teamFolders, setTeamFolders] = React.useState([]); // 팀 폴더
  const [tab, setTab] = React.useState("팀을 선택하세요"); // 팀 선택
  const [tabShow, setTabShow] = React.useState(false); // 팀 드랍메뉴
  const [moreView, setMoreView] = React.useState(null); // 더보기 할 폴더 아이디 값
  const [editingFolder, setEditingFolder] = React.useState(null); // 수정 중인 폴더 아이디값
  const [editingFolderTitle, setEditingFolderTitle] = React.useState(""); // 수정 중인 폴더 이름

  // 드랍메뉴에 보여줄 폴더리스트
  const teamsList = (
    handleTab: (e: React.MouseEvent<HTMLDivElement>) => void,
  ) => {
    return teams.map((teams, idx) => (
      <div key={`team-selectTab-${idx}`} onClick={handleTab}>
        {teams.name}
      </div>
    ));
  };

  // 폴더 선택
  const handleTab = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setTab((e.target as HTMLElement).textContent);
      setTabShow((prev) => !prev);
      setTeam(
        teams.find(
          (team) => team.name === (e.target as HTMLElement).textContent,
        ),
      );
    },
    [teams, tab],
  );

  const handleCreateTeam = () => {
    setIsEdit(false);
    setCreateModalShow(true);
  };

  const handleEditTeam = () => {
    setIsEdit(true);
    setCreateModalShow(true);
  };

  const handleInvite = () => {
    if (tab === "팀을 선택하세요") {
      alert("팀을 선택해주세요");
      return;
    }
    setIsBanish(false);
    setUserModalShow(true);
  };

  const handleBanish = () => {
    if (tab === "팀을 선택하세요") {
      alert("팀을 선택해주세요");
      return;
    }
    setIsBanish(true);
    setUserModalShow(true);
  };

  const handleAddTeamFolder = () => {
    if (tab === "팀을 선택하세요") {
      alert("팀을 선택해주세요");
      return;
    }
    setFolderModalShow(true);
  };

  const handleClickMore = (id: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoreView(id);
  };

  const handleClickFolderEdit = (id: number) => () => {
    setEditingFolder(id);
    setEditingFolderTitle(
      teamFolders.find((folder) => folder.id === id)!.title,
    );
    setMoreView(null);
  };

  const handleClickFolderDelete = (id: number) => async () => {
    try {
      setMoreView(null);
      if (window.confirm("Are you sure you want to delete this folder?")) {
        await Api.delete(`folders/${id}`);
        setTeamFolders(teamFolders.filter((folder) => folder.id !== id));
      }
    } catch (e) {
      alert("삭제에 실패했습니다.");
    }
  };

  const fetchTeamData = async () => {
    try {
      const res = await Api.get("user/teams");
      console.log(res.data);
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTeamFolderData = async () => {
    try {
      const teamId = teams.find((team) => team.name === tab)?.team_id;
      if (!teamId) {
        return;
      }
      const res = await Api.get(`teams/${teamId}/folders`);
      console.log(res.data);
      setTeamFolders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editFolder = async () => {
    try {
      const res = await Api.put(`folders/${editingFolder}`, {
        title: editingFolderTitle,
      });
      console.log(res.data);
      await fetchTeamFolderData();
      setEditingFolder(null);
      setEditingFolderTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchTeamData();
  }, []);

  React.useEffect(() => {
    if (tab !== "팀을 선택하세요") {
      fetchTeamFolderData();
    }
    fetchTeamData();
    setTab(team?.name);
  }, [tab, team]);

  return (
    <>
      <Section>
        <SeparateContainer>
          <ButtonContainer onClick={handleCreateTeam}>
            <ButtonSpan className="icon pe-7s-plus"></ButtonSpan>
            <ButtonSpan>팀 생성</ButtonSpan>
          </ButtonContainer>
        </SeparateContainer>
        <SeparateContainer>
          <DropDown show={tabShow}>
            <div className="container">
              <DropdownHeader onClick={() => setTabShow((prev) => !prev)}>
                <p>{tab ?? "팀을 선택해주세요"}</p>
                <span className="pe-7s-angle-down" />
              </DropdownHeader>
              <div className="select">
                <div className="scroll">{teamsList(handleTab)}</div>
              </div>
            </div>
          </DropDown>
          <ButtonContainer onClick={handleInvite}>
            <ButtonSpan className="icon pe-7s-add-user"></ButtonSpan>
            <ButtonSpan>초대</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleBanish}>
            <ButtonSpan className="icon pe-7s-delete-user"></ButtonSpan>
            <ButtonSpan>추방</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleEditTeam}>
            <ButtonSpan className="icon pe-7s-note"></ButtonSpan>
            <ButtonSpan>수정</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleAddTeamFolder}>
            <ButtonSpan className="icon pe-7s-folder"></ButtonSpan>
            <ButtonSpan>폴더 추가</ButtonSpan>
          </ButtonContainer>
        </SeparateContainer>
        <FoldersContainer>
          <span>폴더 리스트</span>
          {teamFolders.map((folder) => (
            <FolderContainer
              key={folder.id}
              value={folder.id}
              className="TeamFolder"
              editingFolder={editingFolder}
              onClick={() => setSelectedFolder(folder)}
              selectedFolder={selectedFolder}
            >
              {editingFolder === folder.id ? (
                <FolderEditInput
                  value={editingFolderTitle}
                  onChange={(e) => setEditingFolderTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      editFolder();
                    }
                  }}
                />
              ) : (
                <ButtonSpan>{folder.title}</ButtonSpan>
              )}
              <ButtonSpan
                onClick={handleClickMore(folder.id)}
                className="pe-7s-more"
              ></ButtonSpan>
              <FolderMore
                className="dropdown"
                value={folder.id}
                moreView={moreView}
              >
                <li onClick={handleClickFolderEdit(folder.id)}>수정</li>
                <li onClick={handleClickFolderDelete(folder.id)}>삭제</li>
              </FolderMore>
            </FolderContainer>
          ))}
        </FoldersContainer>
      </Section>
    </>
  );
};

export default TeamSidebar;

const Section = styled.section`
  height: 100vh;
  width: 255px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  border-right: 1px solid black;
  position: sticky;
  top: 0;
  background: white;
  = div {
    text-align: center;
  }
`;

const SeparateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-bottom: 1px solid black;
`;

const ButtonContainer = styled.div`
  width: 234px;
  height: 40px;
  margin: 5px;
  margin-bottom: 0;
  padding: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  .icon {
    flex: 0.1 1 0;
    margin-right: 10px;
  }
  :hover {
    background: black;
    span {
      color: white;
    }
  }
  .dropdown {
    font-size: 1rem;
  }
`;

const FolderContainer = styled.div<FolderContainerStyleProps>`
  width: 234px;
  height: 40px;
  margin: 5px;
  margin-bottom: 0;
  padding: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  font-size: 30px;
  font-weight: bold;
  border: 3px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  background-image: ${(props) =>
    props.selectedFolder?.id === props.value
      ? `linear-gradient(white, white), ${props.theme.profileBackground}`
      : "none"};
  background-clip: content-box, border-box;
  background-origin: border-box;

  .pe-7s-more {
    margin-left: auto;
    transform: rotate(90deg);
  }
  :hover {
    background: ${(props) =>
      props.editingFolder !== props.value ? "black" : "white"};
    span {
      color: ${(props) =>
        props.editingFolder !== props.value ? "white" : "black"};
    }
  }
`;

const ButtonSpan = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: black;
  padding: 5px;
  margin: 2px;
  cursor: pointer;
`;

const FolderEditInput = styled.input`
  font-size: 1rem;
  font-weight: bold;
  color: black;
  padding: 5px;
  margin: 2px;
  cursor: pointer;
`;

const FoldersContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 3px;
  border-bottom: 1px solid black;
  overflow-y: scroll;
  height: calc(100vh - 200px);
  width: 234px;
`;

// const Folder = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 234px;
//   height: 60px;
//   justify-content: space-between;
//   align-items: center;
//   padding: 3px;
//   margin: 5px 0px;
//   border-radius: 10px;
//   border: 1px solid black;
//   cursor: pointer;
//   .pe-7s-more {
//     flex: 0.1 1 0;
//     cursor: pointer;
//     align-self: flex-start;
//     padding: 1.5px 4px;
//   }
// `;

const FolderMore = styled.div<FolderMoreStyleProps>`
   {
    display: ${({ value, moreView }) =>
      value === moreView ? "block" : "none"};
    position: absolute;
    margin-left: 85%;
    background-color: #f9f9f9;
    min-width: 60px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    list-style-type: none;

    li {
      font-weight: normal;
      font-size: 16px;
      text-align: center;
    }
    li:hover {
      background: black;
      color: white;
      border-radius: 2px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const DropDown = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 5px;
  margin: 5px;
  margin-top: 0;
  -webkit-box-pack: justify;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 234px;
    height: 100%;
    position: relative;
    -webkit-box-pack: center;
  }
  .select {
    top: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -webkit-box-pack: center;
    justify-content: center;
    width: 234px;
    padding: 50px 20px 0px;
    border-radius: 8px;
    background-color: rgb(235, 235, 235);
    z-index: 3;
    height: ${({ show }) => (show ? "168px" : "50px")};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    transition: height 0.3s ease-out;

    .scroll {
      overflow-y: scroll;
      overflow-x: hidden;
      height: ${({ show }) => (show ? "168px" : "50px")};
      width: 100%;
      padding: 0px;
      margin: 0px;
      border-radius: 8px;
      background-color: rgb(235, 235, 235);
      z-index: 2;
      

    div {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 35px;
      color: rgb(96, 96, 96);
      font-size: 16px;
      letter-spacing: -0.05em;
      cursor: pointer;
      font-weight: 700;
    }
  }
`;

const DropdownHeader = styled.div`
  position: absolute;
  top: 0px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 234px;
  height: 50px;
  padding: 0px 20px;
  border-radius: 8px;
  color: rgb(96, 96, 96);
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.05em;
  z-index: 4;
  cursor: pointer;

  p {
    margin: auto 0;
  }
  span {
    font-size: 15px;
    font-weight: bolder;
  }
`;
