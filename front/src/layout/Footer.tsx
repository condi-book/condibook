import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <img alt="logo" />
      <div>Copyright © 2022 CondiBook. All rights reserved.</div>
    </Container>
  );
};

const Container = styled.footer`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default Footer;
