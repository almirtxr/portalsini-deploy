import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getArticles } from '../services/articleService';

const FeaturedArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetched = await getArticles();
        const visible = fetched.filter((a) => a.isVisible);
        const featured = visible.filter((a) => a.featured);
        const final =
          featured.length > 0
            ? featured
            : visible.length > 0
              ? [visible[visible.length - 1]]
              : [];
        setArticles(final);
        if (final.length > 0) setCurrentIndex(0);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [articles.length]);

  const go = (dir) =>
    setCurrentIndex((prev) => (prev + dir + articles.length) % articles.length);

  if (isLoading) {
    return <div className="aspect-[16/9] w-full animate-pulse bg-neutral-100" />;
  }

  if (articles.length === 0) {
    return (
      <p className="byline py-10 text-center">
        Nenhum artigo em destaque disponível no momento.
      </p>
    );
  }

  const article = articles[currentIndex];

  return (
    <section className="animate-fade-in">
      <div className="group relative overflow-hidden">
        <Link to={`/articles/${article.slug}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8]">
            <img
              src={article.banner}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-brand-yellow">
                {article.category}
              </span>
              <h1 className="headline mt-3 max-w-3xl text-3xl text-white sm:text-4xl md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-3 hidden max-w-2xl text-sm text-neutral-200 sm:block sm:text-base">
                {article.summary}
              </p>
              <span className="byline mt-4 block text-neutral-300">
                Por {article.author}
              </span>
            </div>
          </div>
        </Link>

        {articles.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-brand-red"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-brand-red"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {articles.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-brand-yellow' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticle;
