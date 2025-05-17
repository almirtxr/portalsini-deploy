import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug, getArticleByCategory, postArticleReads } from '../services/articleService';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { Share2 } from 'lucide-react';
import { ArticleStyles } from '../styles/ArticlesStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  margin-top: 4rem;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-top: 3.5rem;
    gap: 0.5rem;
  }
`;

const ArticleWrapper = styled.div`
  flex: 3;
  min-width: 0; /* Permite que o conteúdo se ajuste em telas pequenas */
  width: 100%;
  
  @media (min-width: 769px) {
    min-width: 300px;
    margin-right: -1rem;
  }
`;

const SidebarWrapper = styled.div`
  flex: 1;
  min-width: 0; /* Permite que o conteúdo se ajuste em telas pequenas */
  width: 100%;
  
  @media (min-width: 769px) {
    min-width: 280px;
    margin-left: -1rem;
  }
`;

const ArticleContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  @media (max-width: 480px) {
    padding: 1rem;
    box-shadow: none;
    border-radius: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.3s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ModalImage = styled.img`
  max-width: 95%;
  max-height: 95vh;
  border-radius: 8px;
  cursor: zoom-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transform: scale(0.95);
  transition: transform 0.3s ease;
  animation: zoomIn 0.3s forwards;
  
  @keyframes zoomIn {
    to { transform: scale(1); }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
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
  margin: 0.5rem 0;

  &:hover {
    background: #F8F8FF;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    color: #555;
    line-height: 1.4;
  }

  p {
    font-size: 0.9rem;
    color: #777;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
    
    h2 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    
    h1 {
      font-size: 1.3rem;
    }
    
    h2 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;

const Loading = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #d32f2f;
  font-size: 1.2rem;
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
      const images = articleContentRef.current.querySelectorAll('.article-content img');
      
      const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpandedImage(event.target.src);
      };
  
      images.forEach((image) => {
        image.addEventListener('click', handleClick);
        image.style.cursor = 'pointer';
        
        // Garante que imagens não ultrapassem a largura do container
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
      });
  
      return () => {
        images.forEach((image) => {
          image.removeEventListener('click', handleClick);
        });
      };
    }
  }, [article]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && expandedImage) {
        setExpandedImage(null);
      }
    };
  
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [expandedImage]);

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!article) {
    return <ErrorMessage>Artigo não encontrado</ErrorMessage>;
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
        <ArticleWrapper>
          <ArticleContainer>
            <TitleContainer>
              <h1>{article.title}</h1>
              <h2>{article.summary}</h2>
              <p>
                <i>
                  {article.author} - {new Date(article.date).toLocaleDateString('pt-BR')} | 
                </i>
              </p>
            </TitleContainer>

            <ShareButton onClick={handleShare}>
              <Share2 size={18} /> Compartilhar
            </ShareButton>

            <ArticleStyles />
            <div 
              className="article-content" 
              ref={articleContentRef} 
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
            
            {expandedImage && (
              <ModalOverlay onClick={() => setExpandedImage(null)}>
                <ModalImage 
                  src={expandedImage} 
                  alt="Imagem expandida" 
                  onClick={(e) => e.stopPropagation()} 
                />
                <CloseButton onClick={() => setExpandedImage(null)}>×</CloseButton>
              </ModalOverlay>
            )}
          </ArticleContainer>
        </ArticleWrapper>

        {relatedArticles.length > 0 && (
          <SidebarWrapper>
            <Sidebar articles={relatedArticles} />
          </SidebarWrapper>
        )}
      </MainContent>
      <Footer />
    </Container>
  );
};

export default ArticlePage;