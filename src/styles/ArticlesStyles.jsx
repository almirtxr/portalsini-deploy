// styles/ArticleStyles.jsx

export const ArticleStyles = () => (
  <style jsx global>{`
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      overflow-x: hidden; /* Isso impede o scroll horizontal em todo o site */
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    .article-content {
      max-width: 100%;
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

    /* Imagens normais - centralizadas */
    .article-content > p > img:only-child {
      display: block;
      max-width: 100% !important;
      height: auto !important;
      margin: 1.5rem auto;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }
    
    .article-content > p > img:only-child:hover {
      transform: scale(1.01);
    }
    
    /* --- ESTILOS PARA IMAGE-WITH-TEXT --- */

    .article-content div[data-type="image-with-text"] {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem; /* Espaçamento entre imagem e texto */
      margin: 2rem 0;
    }

    .article-content div[data-type="image-with-text"][data-align="right"] {
      flex-direction: row-reverse; /* Imagem vai para a direita */
    }

    .article-content div[data-type="image-with-text"] img {
      max-width: 40%; /* Ajuste para ser mais flexível que um valor fixo */
      flex-shrink: 0; /* Impede a imagem de encolher */
      height: auto;
      border-radius: 4px;
      margin: 0; /* Remove margens extras */
    }

    .article-content div[data-type="image-with-text"] .content {
      flex: 1; /* Ocupa o espaço restante */
    }

    /* --- ESTILOS PARA FLOATING-BOX --- */

    .article-content div[data-type="floating-box"] {
      padding: 0.5rem;
      border: 3px solid #333;
      margin: 0.5rem;
      background: white;
      width: 45%;
      max-width: 350px;
      box-sizing: border-box;
    }

    .article-content div[data-type="floating-box"][data-align="left"] {
      float: left;
      margin-left: 0;
      margin-right: 1.5em;
    }

    .article-content div[data-type="floating-box"][data-align="right"] {
      float: right;
      margin-right: 0;
      margin-left: 1.5em;
    }

    .article-content div[data-type="floating-box"][data-align="center"] {
      float: none;
      display: block;
      margin: 1.5em auto;
    }
    
    .article-content div[data-type="floating-box"] p {
      border: none;
      background: transparent;
      padding: 0.75rem;
      font-family: 'Helvetica', sans-serif;
      font-weight: bold;
      font-size: 1.2rem;
      text-align: center;
      line-height: 1.3;
      color: #333;
      margin: 0;
    }

    /* IMPORTANTE: Clearfix para os floats */
    .article-content::after {
      content: "";
      display: table;
      clear: both;
    }

    /* ======================================= */
    /* === MEDIA QUERY PARA RESPONSIVIDADE === */
    /* ======================================= */

    @media (max-width: 768px) {
  /* Responsividade para ImageWithText - mantém lado a lado mas menor */
  .article-content div[data-type="image-with-text"] {
    gap: 0.75rem; /* Diminui o espaço entre imagem e texto */
    margin: 1.5rem 0; /* Diminui a margem vertical */
  }

  .article-content div[data-type="image-with-text"] img {
    max-width: 35%; /* Diminui a imagem para 35% no mobile */
  }

  .article-content div[data-type="image-with-text"] .content {
    font-size: 0.95rem; /* Diminui ligeiramente o texto no mobile */
  }

  /* Responsividade para FloatingBox - mantém como estava */
  .article-content div[data-type="floating-box"] {
    float: none;
    width: 100%;
    margin: 1.5rem 0;
  }
}

    /* Para telas muito pequenas - imagem ainda menor */
    @media (max-width: 480px) {
      .article-content div[data-type="image-with-text"] {
        gap: 0.5rem;
      }

      .article-content div[data-type="image-with-text"] img {
        max-width: 30%; /* Ainda menor em telas muito pequenas */
      }

      .article-content div[data-type="image-with-text"] .content {
        font-size: 0.9rem;
      }
    }

      /* Responsividade para FloatingBox */
      .article-content div[data-type="floating-box"] {
        float: none; /* Desativa o float em telas pequenas */
        width: 100%;  /* Ocupa a largura total */
        margin: 1.5rem 0; /* Ajusta a margem para o fluxo vertical */
      }
    }
  `}</style>
);