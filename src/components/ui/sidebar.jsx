
import React from "react";
import useMobile from "../../hooks/use-mobile";
import styled from 'styled-components';

const SidebarContainer = styled.div`
  height: 100vh;
  width: ${props => props.isMobile ? '100%' : '300px'};
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : props.isMobile ? '-100%' : '-300px'};
  background-color: white;
  transition: left 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Sidebar = ({ isOpen }) => {
  const isMobile = useMobile();

  return (
    <SidebarContainer isMobile={isMobile} isOpen={isOpen}>
      {/* Conteúdo do sidebar */}
    </SidebarContainer>
  );
};

export default Sidebar;
