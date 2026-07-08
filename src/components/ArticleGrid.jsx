import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/articleService';

const formatDate = (value) => {
  if (!value) return '';
  // Trata a data como "data pura" (YYYY-MM-DD), sem conversão de fuso,
  // para não exibir o dia anterior em fusos negativos (ex.: UTC-3).
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value));
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('pt-BR');
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR');
};

const ArticleGrid = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetched = await getArticles();
        setArticles(fetched.filter((a) => a.isVisible === true));
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[16/10] w-full bg-neutral-100" />
            <div className="mt-4 h-3 w-1/4 bg-neutral-100" />
            <div className="mt-3 h-5 w-3/4 bg-neutral-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article key={article.id} className="group animate-fade-in">
          <Link to={`/articles/${article.slug}`} className="block">
            <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              <img
                src={article.banner}
                alt={article.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4">
              <span className="cat-label">{article.category}</span>
              <h3 className="headline mt-2 text-xl leading-tight transition-colors group-hover:text-brand-red">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-3 flex items-center justify-between">
                <span className="byline">Por {article.author}</span>
                <span className="byline">{formatDate(article.date)}</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleGrid;
