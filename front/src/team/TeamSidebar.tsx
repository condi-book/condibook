import React from "react";
import styled from "styled-components";
import * as Api from "../api";

type StyleProps = {
  show: boolean;
};

type FolderStyleProps = {
  view: boolean;
};

interface Props {
  setCreateModalShow: (show: boolean) => void;
}

const TeamSidebar = ({ setCreateModalShow }: Props) => {
  const [teams, setTeams] = React.useState([]);
  const [teamFolders, setTeamFolders] = React.useState([]);
  const [tab, setTab] = React.useState("팀을 선택하세요");
  const [tabShow, setTabShow] = React.useState(false);
  const [view, setView] = React.useState(false);
  const viewMore: any = React.useRef([]);

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
    },
    [teams],
  );

  const handleCreateTeam = () => {
    setCreateModalShow(true);
  };

  const clickOutside = (e: any) => {
    if (view && !viewMore.current.includes(e.target)) {
      setView((prev) => !prev);
    }
  };

  const handleClickMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView((prev) => !prev);
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
      const res = await Api.get(`teams/${teamId}/folders`);
      console.log(res.data);
      setTeamFolders(res.data);
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
  }, [tab]);

  React.useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  return (
    <>
      <Section>
        <div className="team-sidebar-header">
          <ButtonContainer onClick={handleCreateTeam}>
            <ButtonSpan className="icon pe-7s-plus"></ButtonSpan>
            <ButtonSpan>팀 생성</ButtonSpan>
          </ButtonContainer>
        </div>
        <div className="team-sidebar-header">
          <DropDown show={tabShow}>
            <div className="container">
              <DropdownHeader onClick={() => setTabShow((prev) => !prev)}>
                <p>{tab}</p>
                <span className="pe-7s-angle-down" />
              </DropdownHeader>
              <div className="select">
                <div className="scroll">{teamsList(handleTab)}</div>
              </div>
            </div>
          </DropDown>
          <ButtonContainer>
            <ButtonSpan className="icon pe-7s-add-user"></ButtonSpan>
            <ButtonSpan>초대</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer>
            <ButtonSpan className="icon pe-7s-delete-user"></ButtonSpan>
            <ButtonSpan>추방</ButtonSpan>
          </ButtonContainer>
          <ButtonContainer>
            <ButtonSpan className="icon pe-7s-note"></ButtonSpan>
            <ButtonSpan>수정</ButtonSpan>
          </ButtonContainer>
        </div>
        <FoldersContainer>
          {teamFolders.map((folders) => (
            <Folder key={folders.folder_id}>
              <span className="pe-7s-folder"></span>
              <span>{folders.name}</span>
              <span onClick={handleClickMore} className="pe-7s-more"></span>
              <FolderMore className="dropdown" view={view}>
                <li
                  ref={(el) => (viewMore.current[1] = el)}
                  // onClick={handleFolderEdit(folders.folder_id)}
                >
                  수정
                </li>
                <li
                  ref={(el) => (viewMore.current[2] = el)}
                  // onClick={handleFolderDelete(folders.folder_id)}
                >
                  삭제
                </li>
              </FolderMore>
            </Folder>
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
  .team-sidebar-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
    border-bottom: 1px solid black;
  }
  div {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  width: 234px;
  height: 40px;
  margin: 5px;
  margin-bottom: 0;
  padding: 2px;
  display: flex;
  flex-direction: row;

  align-items: center;
  border: none;
  color: white;
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  .icon {
    flex: 0.1 1 0;
  }
  :hover {
    background: black;
    span {
      color: white;
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
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-bottom: 1px solid black;
  overflow-y: scroll;
  height: calc(100vh - 200px);
  width: 234px;
`;

const Folder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
  :hover {
    background: black;
    color: white;
  }
`;

const FolderMore = styled.div<FolderStyleProps>`
   {
     {
      display: ${({ view }) => (view ? "block" : "none")};
      position: absolute;
      margin-left: 12.5%;
      background-color: #f9f9f9;
      min-width: 60px;
      padding: 8px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      list-style-type: none;

      li {
        font-weight: normal;
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
