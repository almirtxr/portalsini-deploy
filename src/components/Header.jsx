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
  gap: 16px;
`;

const Logo = styled.img`
  height: 64px;
  width: auto;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: #F9C45D;
    background-color: rgba(0, 0, 0, 0.1);
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
            <Link to ="/admin">
              <Button>
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
