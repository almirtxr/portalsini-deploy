import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleByID, getArticleByCategory } from '../services/articleService';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-top: 5rem; /* Ajuste para evitar sobreposição do header */
  gap: 2rem; /* Espaçamento entre o artigo e a sidebar */
  flex-wrap: wrap; /* Permite que os elementos quebrem em telas menores */

  @media (max-width: 768px) {
    flex-direction: column; /* Coloca o artigo e a sidebar em coluna */
    padding: 1.5rem;
    margin-top: 5rem; 
  }

`;

const ArticleContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  img {
    width: 100%; /* Garante que as imagens não ultrapassem o container */
    height: auto; /* Mantém a proporção original da imagem */
    border-radius: 8px; 
    display: block; 
    margin: 1rem 0; 
  }

  p{
    margin-bottom: 1.5rem;
    line-heitght: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1rem; 
  }
`;

const SidebarContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;


const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticleByID(id);
        setArticle(articleData);
        fetchRelatedArticles(articleData.category);
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
      }
    };

    const fetchRelatedArticles = async (category) => {
      try {
        const articlesData = await getArticleByCategory(category);
        setRelatedArticles(articlesData.filter((articleData) => articleData.id !== id));
      } catch (error) {
        console.error('Erro ao buscar artigos relacionados:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Header />
      <MainContent>
        <ArticleContainer>
          <TitleContainer>
            <h1>{article.title}</h1>
            <h2>{article.summary}</h2>
            <p><i>{article.author} - {new Date(article.date).toLocaleDateString()}</i></p>
          </TitleContainer>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ArticleContainer>
      </MainContent>
      <SidebarContainer>
        <Sidebar articles={relatedArticles} />
      </SidebarContainer>
      <Footer />
    </Container>
  );
};

export default ArticlePage;
