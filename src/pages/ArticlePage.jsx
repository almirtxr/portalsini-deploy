import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug, getArticleByCategory, postArticleReads } from '../services/articleService';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { Share2 } from 'lucide-react';
import { ArticleStyles } from '../styles/ArticlesStyles';
import NewsletterSignup from '../components/NewsletterSignUp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  margin-top: 5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const NewsletterSignUpContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  background: #f8f8ff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ArticleWrapper = styled.div`
  flex: 3;
  min-width: 300px;
  display: flex;
  justify-content: flex-end;
`;

const SidebarWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  flex-direction: column;
`;


const ArticleContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
  max-width: 90%;
  max-height: 90vh;
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
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
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
  if (!articleContentRef.current || !article?.content) return;

  const observer = new MutationObserver(() => {
    console.log('Buscando imagens…');

    const images = articleContentRef.current.querySelectorAll('img');
    console.log(articleContentRef.current?.querySelectorAll('img'));

    images.forEach((image) => {
      image.style.cursor = 'pointer';
      image.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpandedImage(event.target.src);
      };
    });
  });

  observer.observe(articleContentRef.current, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
  };
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
              <Share2 /> Compartilhar
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
          <NewsletterSignUpContainer>
            <h2>Inscreva-se na nossa Newsletter</h2>
            <p>Receba as últimas notícias e atualizações diretamente no seu e-mail.</p>
            <NewsletterSignup />
          </NewsletterSignUpContainer>
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
