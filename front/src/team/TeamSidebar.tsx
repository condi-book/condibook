import React from "react";
import styled from "styled-components";
// import * as Api from "../api";
import { Team, Folder } from "./TeamPage";
import { useNavigate } from "react-router-dom";

type StyleProps = {
  show: boolean;
};

type FolderContainerStyleProps = {
  value: number;
  selectedFolder: Folder;
};

interface Props {
  setCreateModalShow: (show: boolean) => void;
  setUserModalShow: (show: boolean) => void;
  setIsBanish: (isBanish: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setFolderModalShow: (show: boolean) => void;
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  team: Team;
  setTeam: (team: Team) => void;
  teams: Team[];
  selectedFolder: Folder;
  setSelectedFolder: (folder: Folder) => void;
  fetchTeamFolderData: () => Promise<void>;
}

const TeamSidebar = ({
  setCreateModalShow,
  setUserModalShow,
  folders,
  team,
  setTeam,
  teams,
  setIsBanish,
  setIsEdit,
  setFolderModalShow,
  selectedFolder,
  setSelectedFolder,
  fetchTeamFolderData,
}: Props) => {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("팀을 선택하세요"); // 팀 선택
  const [tabShow, setTabShow] = React.useState(false); // 팀 드랍메뉴

  // 드랍메뉴에 보여줄 폴더리스트
  const teamsList = (
    handleTab: (e: React.MouseEvent<HTMLDivElement>) => void,
  ) => {
    return teams?.map((teams, idx) => (
      <div key={`team-selectTab-${idx}`} onClick={handleTab}>
        {teams.name}
      </div>
    ));
  };

  // 팀 선택
  const handleTab = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const findTeam = teams.find(
        (team) => team.name === (e.target as HTMLElement).textContent,
      );
      setTab((e.target as HTMLElement).textContent);
      setTabShow((prev) => !prev);
      setTeam(findTeam);
      navigate(`${findTeam.team_id}`);
    },
    [teams, team, tab],
  );

  const handleClickFolder = (folder: Folder) => () => {
    setSelectedFolder(folder);
    navigate({
      pathname: `${team.team_id}/${folder.id}`,
    });
  };

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

  React.useEffect(() => {
    if (tab !== "팀을 선택하세요") {
      fetchTeamFolderData();
    }
    fetchTeamFolderData();
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
            <ButtonSpan className="word">초대</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleBanish}>
            <ButtonSpan className="icon pe-7s-users"></ButtonSpan>
            <ButtonSpan className="word">유저 정보</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleEditTeam}>
            <ButtonSpan className="icon pe-7s-note"></ButtonSpan>
            <ButtonSpan className="word">수정</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer onClick={handleAddTeamFolder}>
            <ButtonSpan className="icon pe-7s-folder"></ButtonSpan>
            <ButtonSpan className="word">폴더 추가</ButtonSpan>
          </ButtonContainer>
        </SeparateContainer>
        <FoldersContainer style={{ borderBottom: "none" }}>
          <span className="folders-title">폴더 리스트</span>
          <div className="folders-wrap">
            {folders?.map((folder) => (
              <FolderContainer
                key={folder.id}
                value={folder.id}
                className="TeamFolder"
                onClick={handleClickFolder(folder)}
                selectedFolder={selectedFolder}
              >
                <ButtonSpan>{folder.title}</ButtonSpan>
              </FolderContainer>
            ))}
          </div>
        </FoldersContainer>
      </Section>
    </>
  );
};

export default TeamSidebar;

const Section = styled.section`
  width: 255px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.subGrayColor};
  border-radius: 10px;
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
  border-bottom: 1px ridge black;
`;

const ButtonContainer = styled.div`
  width: 234px;
  height: 40px;
  margin: 5px;
  margin-bottom: 0;
  padding: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: none;
  color: black;
  font-size: 30px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  .icon {
    flex: 0.1 1 0;
    margin-right: 10px;
  }
  :hover {
    background: ${({ theme }) => theme.profileBackground};
    span {
      color: white;
    }
  }
  .dropdown {
    font-size: 1rem;
  }

  .word {
    width: 72px;
    text-align: center;
  }
`;

const FolderContainer = styled.div<FolderContainerStyleProps>`
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
  // border: 3px solid transparent;
  border-radius: 5px;
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
    background: ${({ theme }) => theme.profileBackground};
    span {color: white;}
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

const FoldersContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 5px;
  border-bottom: 1px ridge black;
  overflow-y: scroll;
  height: 100%;
  width: 234px;
  .folders-title {
    margin: 10px 0;
    font-weight: bold;
  }

  .folders-wrap {
    width: 100%;
    background: white;
    height: 100%;
    border-radius: 5px;
  }
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
    border-radius: 5px;
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
