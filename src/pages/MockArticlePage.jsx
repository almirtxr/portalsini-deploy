import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Share2 } from 'lucide-react';

// Mock data - substitua pelos seus dados reais
const mockArticle = {
  id: 1,
  slug: 'artigo-exemplo',
  title: 'Como Criar Aplicações React Responsivas',
  summary: 'Um guia completo para desenvolver aplicações que se adaptam a qualquer dispositivo',
  author: 'João Silva',
  date: '2023-05-15',
  category: 'Desenvolvimento',
  content: `
    <p>Desenvolver aplicações responsivas é essencial nos dias de hoje. Com a variedade de dispositivos disponíveis, seu site precisa se adaptar perfeitamente a cada um deles.</p>
    
    <h2>1. Mobile-First Approach</h2>
    <p>Sempre comece projetando para dispositivos móveis primeiro. Isso garante que sua aplicação será funcional mesmo em telas pequenas.</p>
    <img src="https://via.placeholder.com/800x400?text=Mobile+First" alt="Mobile First Design">
    
    <h2>2. Media Queries</h2>
    <p>Use media queries para adaptar seu layout em diferentes breakpoints. Exemplo comum:</p>
    <pre><code>@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}</code></pre>
    
    <h2>3. Imagens Responsivas</h2>
    <p>Sempre defina <code>max-width: 100%</code> para imagens. Isso evita que ultrapassem os limites do container.</p>
    <img src="https://via.placeholder.com/1000x500?text=Responsive+Images" alt="Imagens responsivas">
    
    <p>Com essas técnicas, você pode criar aplicações que funcionam bem em qualquer dispositivo!</p>
  `
};

const mockRelatedArticles = [
  {
    id: 2,
    title: 'Princípios do Design Responsivo',
    summary: 'Conheça os fundamentos do design que se adapta a qualquer tela',
    category: 'Design',
    date: '2023-04-20'
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox',
    summary: 'Quando usar cada uma dessas poderosas técnicas de layout',
    category: 'Desenvolvimento',
    date: '2023-03-15'
  },
  {
    id: 4,
    title: 'Otimização para Dispositivos Móveis',
    summary: 'Técnicas para melhorar performance em smartphones',
    category: 'Performance',
    date: '2023-02-10'
  }
];

// Componentes estilizados (copiados da sua implementação com ajustes)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 3.5rem;
  gap: 1rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 5rem;
    padding: 2rem;
  }
`;

const ArticleWrapper = styled.div`
  width: 100%;
  order: 1;

  @media (min-width: 769px) {
    flex: 3;
    order: initial;
    margin-right: -1rem;
  }
`;

const SidebarWrapper = styled.div`
  width: 100%;
  order: 2;

  @media (min-width: 769px) {
    flex: 1;
    order: initial;
    margin-left: -1rem;
  }
`;

const ArticleContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 769px) {
    padding: 1.5rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.3s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ModalImage = styled.img`
  max-width: 95%;
  max-height: 95vh;
  border-radius: 8px;
  cursor: zoom-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transform: scale(0.95);
  transition: transform 0.3s ease;
  animation: zoomIn 0.3s forwards;
  
  @keyframes zoomIn {
    to { transform: scale(1); }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem 0;

  &:hover {
    background: #F8F8FF;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    color: #555;
    line-height: 1.4;
  }

  p {
    font-size: 0.9rem;
    color: #777;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
    
    h2 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    
    h1 {
      font-size: 1.3rem;
    }
    
    h2 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1rem;
  z-index: 100;
`;

const Footer = styled.footer`
  background: #f8f9fa;
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
`;

const SideBar = ({ articles }) => (
  <div style={{
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <h3>Artigos Relacionados</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {articles.map(article => (
        <li key={article.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>{article.title}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{article.summary}</p>
          <small style={{ color: '#999' }}>{article.date}</small>
        </li>
      ))}
    </ul>
  </div>
);

// Componente principal
const ArticlePageMock = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const articleContentRef = useRef(null);

  // Simula o efeito de clique nas imagens
  const handleImageClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setExpandedImage(e.target.src);
    }
  };

  const handleShare = () => {
    alert('Funcionalidade de compartilhamento ativada!\nURL: ' + window.location.href);
  };

  return (
    <Container>
      <Header>
        <h1 style={{ margin: 0 }}>Logo do Site</h1>
      </Header>
      
      <MainContent>
        <ArticleWrapper>
          <ArticleContainer>
            <TitleContainer>
              <h1>{mockArticle.title}</h1>
              <h2>{mockArticle.summary}</h2>
              <p>
                <i>
                  {mockArticle.author} - {new Date(mockArticle.date).toLocaleDateString('pt-BR')} | 
                </i>
              </p>
            </TitleContainer>

            <ShareButton onClick={handleShare}>
              <Share2 size={18} /> Compartilhar
            </ShareButton>

            <div 
              className="article-content" 
              ref={articleContentRef}
              onClick={handleImageClick}
              dangerouslySetInnerHTML={{ __html: mockArticle.content }} 
              style={{
                width: '100%',
                lineHeight: '1.6',
                fontFamily: 'Arial, sans-serif',
                color: '#333'
              }}
            />
            
            {expandedImage && (
              <ModalOverlay onClick={() => setExpandedImage(null)}>
                <ModalImage 
                  src={expandedImage} 
                  alt="Imagem expandida" 
                  onClick={(e) => e.stopPropagation()} 
                />
                <CloseButton onClick={() => setExpandedImage(null)}>×</CloseButton>
              </ModalOverlay>
            )}
          </ArticleContainer>
        </ArticleWrapper>

        <SidebarWrapper>
          <SideBar articles={mockRelatedArticles} />
        </SidebarWrapper>
      </MainContent>
      
      <Footer>
        <p>© 2023 Meu Site - Todos os direitos reservados</p>
      </Footer>
    </Container>
  );
};

export default ArticlePageMock;