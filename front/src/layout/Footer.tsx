import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <img src="static/img/footer.png" alt="logo" />
      <div className="description">
        Copyright © 2022 CondiBook. All rights reserved.
      </div>
    </Container>
  );
};

const Container = styled.footer`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
    padding: 3%;
    width: 43%;
    height: 80%;
  }
  .description {
    font-size: 1.2vw;
  }
`;

export default Footer;
