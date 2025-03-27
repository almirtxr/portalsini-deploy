import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getArticles } from '../services/articleService';

const ArticleContainer = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column; /* Permite empilhar os elementos */

  @media (max-width: 768px) {
    height: auto; /* Altura dinâmica */
  }
`;

const ArticleImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    position: static; /* Remove do fundo */
    object-fit: contain; /* Garante que toda a imagem seja visível */
    height: auto;
    max-height: 100%;
  }
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);

  @media (max-width: 768px) {
    display: none; /* Remove o gradiente no mobile */
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;

  @media (max-width: 768px) {
    position: static; /* Permite que o conteúdo vá para baixo da imagem */
    padding: 1rem;
    text-align: center;
  }
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  background-color: #BB1832;
  color: white;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  color: white;
  margin-bottom: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    color: black; /* Texto preto no mobile */
  }
`;


const Excerpt = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  max-width: 50rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    color: black; /* Texto preto no mobile */
    text-align: left;
  }
`;

const Author = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 1rem;
  max-width: 42rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    text-align: left;
  }
`;


const ReadButton = styled(Link)`
  background-color: white;
  color: #BB1832;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.1);
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    top: 43%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%; /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

  ${(props) => (props.$left ? 'left: 1rem;' : 'right: 1rem;')}
`;

const FeaturedArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        const visibleArticles = fetchedArticles.filter(article => article.isVisible);
        const featuredArticles = visibleArticles.filter(article => article.featured);

        setArticles(featuredArticles.length > 0 ? featuredArticles : [visibleArticles[visibleArticles.length - 1]]);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);

  const nextArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <ArticleContainer>
      {articles.length > 0 && (
        <>
          <Arrow $left onClick={prevArticle}>❮</Arrow>
          <ArticleImage src={articles[currentIndex].banner} alt={articles[currentIndex].title} />
          <Gradient />
          <Content>
            <Category>{articles[currentIndex].category}</Category>
            <Title>{articles[currentIndex].title}</Title>
            <Excerpt>{articles[currentIndex].summary}</Excerpt>
            <Author>{articles[currentIndex].author}</Author>
            <ReadButton to={`/articles/${articles[currentIndex].slug}`}>Ler mais</ReadButton>
          </Content>
          <Arrow onClick={nextArticle}>❯</Arrow>
        </>
      )}
    </ArticleContainer>
  );
};

export default FeaturedArticle;
