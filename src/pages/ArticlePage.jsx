import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleByID, getArticleByCategory } from '../services/articleService';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { use } from 'react';


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
    cursor: pointer; /* Indica que a imagem é clicável */
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02); /* Efeito de leve zoom ao passar o mouse */
    }
  }

  p{
    margin-bottom: 1.5rem;
    line-heitght: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1rem; 
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  cursor: pointer;
`;

const SidebarContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;


const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 2rem; 
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  gap: 1rem; /* Espaçamento entre os elementos */
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #555;
  }

  p {
    font-size: 1rem;
    color: #777;
  }
`;


const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const articleContentRef = useRef(null);

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

  useEffect(() => {
    if(articleContentRef.current) {
      const images = articleContentRef.current.querySelectorAll('img');
      images.forEach((image) => {
        img.addEventListener('click', () => setExpandedImage(img.src));
      });
    }
  }, [article]);

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

          {/* Renderiza o conteúdo com imagens clicáveis */}
          <div ref={articleContentRef} dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Modal de Imagem Expandida */}
          {expandedImage && (
            <ModalOverlay onClick={() => setExpandedImage(null)}>
              <ModalImage src={expandedImage} alt="Imagem expandida" />
            </ModalOverlay>
          )}
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