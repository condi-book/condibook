import React from "react";
import styled from "styled-components";
import * as Api from "../api";

type StyleProps = {
  show: boolean;
};

interface Props {
  setCreateModalShow: (show: boolean) => void;
}

const TeamSidebar = ({ setCreateModalShow }: Props) => {
  const [teams, setTeams] = React.useState([]);
  const [tab, setTab] = React.useState("팀을 선택하세요");
  const [tabShow, setTabShow] = React.useState(false);

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

  const fetchTeamData = async () => {
    try {
      const res = await Api.get("user/teams");
      console.log(res.data);
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchTeamData();
  }, []);
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
