import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Twitter, Facebook, Link2, Check } from 'lucide-react';
import {
  getArticleBySlug,
  getArticleByCategory,
  postArticleReads,
} from '../services/articleService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import NewsletterSignup from '../components/NewsletterSignUp';

const formatDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR');
};

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const countedSlugs = useRef(new Set());

  useEffect(() => {
    let active = true;
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getArticleBySlug(slug);
        if (!data) throw new Error('Artigo não encontrado');
        if (!active) return;
        setArticle(data);

        if (data.category) {
          getArticleByCategory(data.category)
            .then((list) =>
              active && setRelatedArticles(list.filter((a) => a.id !== data.id))
            )
            .catch((e) => console.error('Erro ao buscar relacionados:', e));
        }

        // Conta a leitura só uma vez por slug nesta sessão
        if (data.id && !countedSlugs.current.has(slug)) {
          countedSlugs.current.add(slug);
          postArticleReads(data.id).catch(() => {});
        }
      } catch (err) {
        console.error('Erro ao buscar artigo:', err);
        if (active) setError(err.message || 'Erro ao carregar o artigo');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchArticle();
    return () => {
      active = false;
    };
  }, [slug]);

  // Fecha o lightbox com Esc
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setExpandedImage(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const readingTime = useMemo(() => {
    if (!article?.content) return 1;
    const words = article.content
      .replace(/<[^>]+>/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [article]);

  const handleContentClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setExpandedImage(e.target.currentSrc || e.target.src);
    }
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const share = async (type) => {
    const title = article?.title || 'Portal Sîni';
    if (type === 'native' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch { /* cancelado */ }
      return;
    }
    if (type === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    const targets = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    if (targets[type]) window.open(targets[type], '_blank', 'noopener,noreferrer');
  };

  const Shell = ({ children }) => (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">{children}</main>
      <Footer />
    </div>
  );

  if (loading) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-3 w-24 bg-neutral-100" />
          <div className="mt-4 h-10 w-full bg-neutral-100" />
          <div className="mt-2 h-10 w-2/3 bg-neutral-100" />
          <div className="mt-8 aspect-video w-full bg-neutral-100" />
        </div>
      </Shell>
    );
  }

  if (error || !article) {
    return (
      <Shell>
        <p className="byline py-20 text-center">{error || 'Artigo não encontrado'}</p>
      </Shell>
    );
  }

  const shareButtons = [
    { type: 'copy', label: 'Copiar link', Icon: copied ? Check : Link2 },
    { type: 'twitter', label: 'Compartilhar no X', Icon: Twitter },
    { type: 'facebook', label: 'Compartilhar no Facebook', Icon: Facebook },
    { type: 'native', label: 'Compartilhar', Icon: Share2 },
  ];

  return (
    <Shell>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <article className="mx-auto min-w-0 max-w-3xl lg:mx-0">
          <span className="cat-label">{article.category}</span>
          <h1 className="headline mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">
            {article.title}
          </h1>
          {article.summary && (
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {article.summary}
            </p>
          )}

          <div className="byline mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-brand-red">Por {article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{readingTime} min de leitura</span>
          </div>

          {/* Compartilhar */}
          <div className="mt-5 flex items-center gap-2 border-y border-neutral-200 py-3">
            <span className="byline mr-1">Compartilhar</span>
            {shareButtons.map(({ type, label, Icon }) => (
              <button
                key={type}
                type="button"
                aria-label={label}
                onClick={() => share(type)}
                className="rounded-full border border-neutral-300 p-2 text-ink transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Imagem de destaque */}
          {article.banner && (
            <figure className="mt-8">
              <img
                src={article.banner}
                alt={article.title}
                className="w-full bg-neutral-100 object-cover"
              />
            </figure>
          )}

          {/* Conteúdo */}
          <div
            className="article-content dropcap mt-8"
            onClick={handleContentClick}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Newsletter */}
          <div className="mt-14">
            <NewsletterSignup />
          </div>
        </article>

        <aside className="mt-14 lg:mt-0">
          <Sidebar articles={relatedArticles} />
        </aside>
      </div>

      {/* Lightbox */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-fade-in"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Imagem ampliada"
            className="max-h-[90vh] max-w-[92vw] cursor-zoom-out rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setExpandedImage(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white/30"
          >
            ×
          </button>
        </div>
      )}
    </Shell>
  );
};

export default ArticlePage;
