import React from "react";
import styled from "styled-components";

const SideBar = () => {
  const iconList = [
    "pe-7s-user",
    "pe-7s-home",
    "pe-7s-folder",
    "pe-7s-global",
    "pe-7s-search",
    "pe-7s-config",
  ];
  return (
    <Section>
      {iconList.map((item: string, index: number) => (
        <div key={index}>
          <span className={item}></span>
        </div>
      ))}
    </Section>
  );
};

const Section = styled.section`
  height: 100vh;
  width: 100px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 20px;

  div {
    text-align: center;
  }
  span {
    font-size: 60px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.mainColor};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export default SideBar;
