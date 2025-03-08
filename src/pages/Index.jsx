import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const MainContent = styled.main`
  max-width: 75%;
  margin: 0 auto;
  padding: 120px 1rem 0;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.875rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const Index = () => {
  const featuredArticle = {
    title: "Lorem ipsum dolor sit amet consectetur",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    category: "Lorem Ipsum"
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <FeaturedArticle {...featuredArticle} />
        <Section>
          <SectionTitle>Outras notícias</SectionTitle>
          <ArticleGrid />
        </Section>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Index;