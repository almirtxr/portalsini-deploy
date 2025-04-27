import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem; /* Espaço nas laterais */
`;

const SidebarContainer = styled.div`
  display: flex;
  overflow-x: auto;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem 0;
  padding-left: 2rem;
  padding-right: 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Altera a direção para coluna em telas menores */
    align-items: center;
  }
`;

const SidebarTitulo = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
`;

const SidebarItem = styled.div`
  min-width: 12rem;
  max-width: 12rem;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }

`;

const SidebarImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 0.5rem;
  display: block;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

const Sidebar = ({ articles }) => {
  return (
    <Wrapper>
      <div>
        <SidebarTitulo>Notícias relacionadas</SidebarTitulo>
        <SidebarContainer>
          {articles.filter(article => article.isVisible).map((article) => (
            <SidebarItem key={article.id}>
              <SidebarImage src="article.imageUrl" alt="Imagem do artigo" />
              <CategoryTag>{article.category}</CategoryTag>
              <ArticleLink to={`/articles/${article.slug}`}>{article.title}</ArticleLink>
            </SidebarItem>
          ))}
        </SidebarContainer>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
