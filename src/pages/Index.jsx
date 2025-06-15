import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import NewsletterSignup from '../components/NewsletterSignUp';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const MainContent = styled.main`
  max-width: 75%;
  margin: 0 auto;
  padding: 120px 1rem 0;

  @media (max-width: 768px) {
    max-width: 95%;
  }
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

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <FeaturedArticle/>
        <Section>
          <SectionTitle>Outras notícias</SectionTitle>
          <ArticleGrid />
        </Section>
        <Section>
          <SectionTitle>Assine nossa newsletter</SectionTitle>
          <NewsletterSignup />
        </Section>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Index;