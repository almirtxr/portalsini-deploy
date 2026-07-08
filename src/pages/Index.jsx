import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleGrid from '../components/ArticleGrid';
import NewsletterSignup from '../components/NewsletterSignUp';

const SectionTitle = ({ children }) => (
  <div className="mb-8 flex items-center gap-4">
    <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-ink">
      <span className="mark-yellow">
        <span className="mark-bar" aria-hidden="true" />
        <span className="mark-text">{children}</span>
      </span>
    </h2>
    <span className="h-px flex-1 bg-neutral-200" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <FeaturedArticle />

        <section className="mt-16">
          <SectionTitle>Últimas notícias</SectionTitle>
          <ArticleGrid />
        </section>

        <section className="mt-20">
          <NewsletterSignup />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
