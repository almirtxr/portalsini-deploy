// Header.tsx
import React from 'react';
import { Menu, Search, User } from "lucide-react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #C78A47;
  z-index: 50;
  border-bottom: 1px solid #ccc;
  animation: fadeIn 0.5s ease-in-out;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 16px; /* Adiciona padding para alinhar com o contêiner */
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-family: 'Inter', sans-serif; /* Altera a fonte */

  @media (max-width: 768px) {
    .user-icon {
      display: none; /* Oculta o ícone de usuário em telas menores */
    }
  }
`;

const Logo = styled.img`
  height: 64px;
  width: auto;

  @media (max-width: 768px) {
    height: 48px; /* Reduz o tamanho do logo em telas menores */
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-family: 'Inter', sans-serif; /* Altera a fonte */
  font-size: 1rem; /* Tamanho padrão do texto */
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: #FFFFFF;
    background-color: #C78A47;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Aumenta o tamanho do texto em telas menores */
    font-family: 'Inter', sans-serif; /* Altera a fonte em telas menores */
  }

  .icon {
    height: 30px;
    width: 30px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <HeaderLeft>
            <Link to="/">
              <Logo src="/marca-principal.png" alt="Logo" />
            </Link>
          </HeaderLeft>
          <HeaderRight>
            <Link to="/sobre">
              <Button>Sobre</Button>
            </Link>
            <Link to="/admin">
              <Button className="user-icon">
                <User className="icon" />
              </Button>
            </Link>
          </HeaderRight>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
