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

    /* Imagens normais - centralizadas */
    .article-content img:not([data-type="image-with-text"] img) {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 1.5rem auto;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    /* Efeito de hover para mostrar que é clicável */
    .article-content img:not([data-type="image-with-text"] img):hover {
      transform: scale(1.01);
    }

    /* Container para imagens que não são parte de image-with-text */
    .article-content p:has(> img:only-child) {
      text-align: center;
    }

    .article-content img {
      max-width: 100% !important;
      height: auto !important;
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

    .article-content div[data-type="floating-box"] {
      padding: 0.5rem;
      border: 3px solid #333;
      margin: 1rem;
      background: white;
      width: 45%; /* Ocupa menos da metade da largura para o texto fluir */
      box-sizing: border-box;
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

    /* Regras de alinhamento */
    .article-content div[data-align="left"] {
      float: left;
      margin-left: 0;
      margin-right: 1.5em; /* Espaço entre o box e o texto */
    }

    .article-content div[data-align="right"] {
      float: right;
      margin-right: 0;
      margin-left: 1.5em; /* Espaço entre o box e o texto */
    }

    .article-content div[data-align="center"] {
      float: none;
      display: block;
      margin: 1.5em auto; /* Centraliza o bloco */
    }

    /* IMPORTANTE: Clearfix */
    /* Adicione isso ao container do conteúdo do seu artigo para evitar que 
      os floats quebrem o layout do container pai */
    .article-content::after {
      content: "";
      display: table;
      clear: both;

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