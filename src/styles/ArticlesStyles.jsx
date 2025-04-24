// styles/ArticleStyles.jsx
export const ArticleStyles = () => (
  <style jsx global>{`
    .article-content {
      width: 100%;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .article-content h1,
    .article-content h2,
    .article-content h3,
    .article-content h4,
    .article-content h5,
    .article-content h6 {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    .article-content p {
      margin-bottom: 1.2rem;
    }

    .article-content img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      cursor: pointer;
      border-radius: 4px;
    }

    /* Estilos para imagem com texto */
    .article-content div[data-type="image-with-text"] {
      display: flex;
      gap: 16px;
      margin: 16px 0;
      align-items: flex-start;
    }

    .article-content div[data-type="image-with-text"] img {
      max-width: 300px;
      border-radius: 4px;
      object-fit: cover;
      margin: 0; /* Resetar margin para evitar problemas de espaçamento */
    }

    .article-content div[data-type="image-with-text"] .content {
      flex: 1;
    }

    /* Alinhamento direito - Coloca a imagem à direita */
    .article-content div[data-type="image-with-text"][data-align="right"] {
      flex-direction: row-reverse;
    }

    /* Alinhamento esquerdo (padrão) - Coloca a imagem à esquerda */
    .article-content div[data-type="image-with-text"][data-align="left"] {
      flex-direction: row;
    }

    /* Responsividade para mobile */
    @media (max-width: 768px) {
      .article-content div[data-type="image-with-text"],
      .article-content div[data-type="image-with-text"][data-align="right"],
      .article-content div[data-type="image-with-text"][data-align="left"] {
        flex-direction: column;
      }
      
      .article-content div[data-type="image-with-text"] img {
        max-width: 100%;
      }
    }
    
    /* Adicione aqui seus outros estilos já existentes */
  `}</style>
);