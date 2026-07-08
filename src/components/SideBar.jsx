import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ articles }) => {
  const list = articles
    .filter((a) => a.isVisible)
    .sort((a, b) => (b.reads || 0) - (a.reads || 0))
    .slice(0, 5);

  if (list.length === 0) return null;

  return (
    <div className="sticky top-28">
      <h2 className="font-heading text-lg font-extrabold uppercase tracking-tight text-ink">
        <span className="mark-yellow">
          <span className="mark-bar" aria-hidden="true" />
          <span className="mark-text">Leia também</span>
        </span>
      </h2>

      <ul className="mt-6 flex flex-col divide-y divide-neutral-200">
        {list.map((article) => (
          <li key={article.id} className="py-4 first:pt-0">
            <Link to={`/articles/${article.slug}`} className="group flex gap-3">
              <div className="h-16 w-20 shrink-0 overflow-hidden bg-neutral-100">
                <img
                  src={article.banner}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <span className="cat-label">{article.category}</span>
                <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-brand-red">
                  {article.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
