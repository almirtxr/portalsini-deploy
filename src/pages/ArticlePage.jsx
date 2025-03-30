import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug, getArticleByCategory, postArticleReads } from '../services/articleService';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { Share2 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-top: 5rem;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
    margin-top: 5rem;
  }
`;

const ArticleContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 1rem 0;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
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

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #F8F8FF;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const articleContentRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const articleData = await getArticleBySlug(slug);
        
        if (!articleData) {
          throw new Error('Artigo não encontrado');
        }
        
        setArticle(articleData);
        
        if (articleData.category) {
          fetchRelatedArticles(articleData.category, articleData.id);
        }
        
        if (articleData.id) {
          await postArticleReads(articleData.id);
        }
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
        setError(error.message || 'Erro ao carregar o artigo');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedArticles = async (category, articleId) => {
      try {
        const articlesData = await getArticleByCategory(category);
        setRelatedArticles(articlesData.filter(article => article.id !== articleId));
      } catch (error) {
        console.error('Erro ao buscar artigos relacionados:', error);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (articleContentRef.current && article?.content) {
      const images = articleContentRef.current.querySelectorAll('img');
      
      const handleClick = (event) => {
        setExpandedImage(event.target.src);
      };

      images.forEach((image) => image.addEventListener('click', handleClick));

      return () => {
        images.forEach((image) => image.removeEventListener('click', handleClick));
      };
    }
  }, [article]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  const handleShare = async () => {
    const url = window.location.href;
    const title = article.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <ArticleContainer>
          <TitleContainer>
            <h1>{article.title}</h1>
            <h2>{article.summary}</h2>
            <MetaData>
              <i>
                {article.author} - {new Date(article.date).toLocaleDateString('pt-BR')} | 
                {article.reads || 0} leitura{article.reads !== 1 ? 's' : ''}
              </i>
            </MetaData>
          </TitleContainer>

          <ShareButton onClick={handleShare}>
            <Share2 /> Compartilhar
          </ShareButton>

          <ArticleContent ref={articleContentRef} dangerouslySetInnerHTML={{ __html: article.content }} />

          {expandedImage && (
            <ModalOverlay onClick={() => setExpandedImage(null)}>
              <ModalImage src={expandedImage} alt="Imagem expandida" />
            </ModalOverlay>
          )}
        </ArticleContainer>
      </MainContent>
      <SidebarContainer>
        {relatedArticles.length > 0 && (
          <Sidebar articles={relatedArticles} title="Artigos Relacionados" />
        )}
      </SidebarContainer>
      <Footer />
    </Container>
  );
};

export default ArticlePage;

