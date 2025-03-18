import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/articleService';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-out;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;  
  @media (max-width: 768px) {
    object-fit: contain; /* Garante que toda a imagem seja visível */
    height: auto;
    max-height: 100%;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardCategory = styled.span`
  color: #BB1832;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin: 0.5rem 0 0.75rem;
`;

const CardExcerpt = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardMeta = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ArticleGrid = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        const filteredArticles = fetchedArticles.filter(article => article.isVisible === true);
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      }
    };

    fetchArticles();
  }, []);


  return (
    <Grid>
      {articles.map((articles) => (
        <Card key={articles.id}>
          <CardLink to={`/articles/${articles.id}`}>
            <CardImage src={articles.banner} alt={articles.title} />
            <CardContent>
              <CardCategory>{articles.category}</CardCategory>
              <CardTitle>{articles.title}</CardTitle>
              <CardExcerpt>{articles.excerpt}</CardExcerpt>
            </CardContent>
            <CardFooter>
              <CardMeta>{articles.author}</CardMeta>
              <CardMeta>{new Date(articles.date).toLocaleDateString()}</CardMeta>
            </CardFooter>
          </CardLink>
        </Card>
      ))}
    </Grid>
  );
};

export default ArticleGrid;