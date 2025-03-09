import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getArticles } from '../services/articleService';

const ArticleContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  animation: fadeIn 0.5s ease-out;

  @media (max-width: 768px) {
    height: 50vh; /* Reduz altura para celular */
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ArticleImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem; /* Menos padding em telas menores */
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
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Ajusta o título para telas menores */
  }
`;

const Excerpt = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  max-width: 42rem;

  @media (max-width: 768px) {
    font-size: 0.875rem; /* Texto menor para evitar corte */
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

  ${(props) => (props.$left ? 'left: 1rem;' : 'right: 1rem;')}

  @media (max-width: 768px) {
    padding: 0.5rem; /* Botões menores no mobile */
  }
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
            <ReadButton to={`/articles/${articles[currentIndex].id}`}>Ler mais</ReadButton>
          </Content>
          <Arrow onClick={nextArticle}>❯</Arrow>
        </>
      )}
    </ArticleContainer>
  );
};

export default FeaturedArticle;
