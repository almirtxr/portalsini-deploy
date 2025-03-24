import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterContainer = styled.footer`
  background-color: #c78a47;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: relative;
  bottom: 0;
  padding: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 6rem;
    justify-content: center;
    padding: 1.5rem 0;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  text-align: center;
  padding-left: 8rem; /* Mantém um alinhamento mais uniforme */
  
  img {
    max-width: 10rem;
    padding: 0 4px;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const FooterPages = styled.div`
  padding: 0 4rem; /* Reduz o espaçamento lateral */
  
  ul {
    list-style: none;
    padding: 0;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 12px; /* Mantém espaçamento equilibrado */

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 16px;
    }
  }

  li {
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  li:hover {
    color: white;
  }
`;

const FooterIcons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 4rem; /* Ajusta para alinhar melhor */

  h4 {
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    gap: 1.5rem; /* Mantém espaçamento uniforme */
    align-items: center;
  }
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const FooterButton = styled(Link)`
  text-decoration: none;
  color: inherit;
  justify-content: center;
  background-color: #c78a47;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    text-color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <img src="/Portal-Sini-branco-apenas-nome.png" alt="Logo" />
      </LogoContainer>
      <FooterPages>
        <ul>
          <li><FooterButton to="/">Página Inicial</FooterButton></li>
          <li><FooterButton to="/contato">Contato</FooterButton></li>
        </ul>
      </FooterPages>
      <FooterIcons>
        <h4>Conecte-se</h4>
        <div>
          <InstagramIcon />
          <XIcon />
          <LinkedInIcon />
        </div>
      </FooterIcons>
    </FooterContainer>
  );
};

export default Footer;
