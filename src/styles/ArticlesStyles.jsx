// styles/ArticleStyles.js
import { createGlobalStyle } from 'styled-components';

export const ArticleStyles = createGlobalStyle`
  .article-content {
    width: 100%;
    line-height: 1.6;
    font-size: 1.1rem;

    /* Estilos para imagens com texto */
    .image-with-text {
      display: flex;
      gap: 2rem;
      margin: 2rem 0;
      align-items: flex-start;

      img {
        max-width: 40%;
        min-width: 250px;
        border-radius: 8px;
        object-fit: cover;
      }

      .content {
        flex: 1;
        
        p {
          margin: 0;
          padding: 0;
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
        
        img {
          max-width: 100%;
          min-width: 100%;
        }
      }
    }

    /* Estilos para imagens normais */
    img:not(.image-with-text img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
    }
  }
`;