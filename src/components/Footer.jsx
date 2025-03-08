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
  flex-wrap: wrap; /* Permite que os itens quebrem em uma nova linha */
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: relative;
  bottom: 0;
  padding: 1rem 0;

  /* Media queries para diferentes tamanhos de tela */
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 15rem;
    justify-content: center;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: row;
    min-height: 12rem;
  }

  @media (min-width: 1025px) {
    flex-direction: row;
    min-height: 12rem;
  }
`;

const LogoContainer = styled.div`
  flex: 1 1 100%; /* Garante que o logo ocupe toda a largura disponível */
  text-align: center;
  margin-bottom: 1rem;

  img {
    max-width: 12rem;
    padding: 0 4px;
  }
`;

const FooterPages = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;

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
    color: #f9c45d;
  }
`;

const FooterIcons = styled.div`
  text-align: center;
  div {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }
`;

const FooterAuthor = styled.div`
  text-align: center;
  h1 {
    font-size: 1rem;
    margin: 4px 0;
  }
`;

const FooterButton = styled(Link)`
  text-decoration: none;
  color: inherit;
  justify-content: space-between;
  background-color: #c78a47;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c78a47;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <img src="/marca-principal.png" alt="Logo" />
      </LogoContainer>
      <FooterPages>
        <ul>
          <li><FooterButton to="/">Página Inicial</FooterButton></li>
          <li><FooterButton to="/sobre">Sobre</FooterButton></li>
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
      <FooterAuthor>
        <h1>Criado por:</h1>
        <h1>Brenda dos Santos Teixeira</h1>
      </FooterAuthor>
    </FooterContainer>
  );
};

export default Footer;
