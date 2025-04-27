import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { Share2 } from 'lucide-react';

// ... aqui ficam todos os styled-components (Container, MainContent, etc), você pode copiar os mesmos que já usou.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  margin-top: 5rem;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const ArticleWrapper = styled.div`
  flex: 3;
  min-width: 300px;
`;

const SidebarWrapper = styled.div`
  flex: 1;
  min-width: 300px;
`;


const ArticleContainer = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 1rem 0;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  cursor: pointer;
`;

const SidebarContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
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

  &:hover {
    background: #F8F8FF;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #555;
  }

  p {
    font-size: 1rem;
    color: #777;
  }
`;

const mockArticle = {
  id: '123',
  title: 'DA INCLUSÃO AO DESAFIO: a universidade que acolhe é a mesma que exclui',
  summary: 'Resumo do artigo para teste local.',
  author: 'Nome do Autor',
  date: new Date().toISOString(),
  content: `
    <p>Este é um conteúdo <strong>simulado</strong> para testes locais.</p>
    <img src="https://via.placeholder.com/600x300" alt="Imagem de exemplo" />
    <p>Mais texto de exemplo para simular um artigo.</p>
    

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis pulvinar ullamcorper. 
    Duis ultricies elementum sem sit amet interdum. Sed bibendum sodales dignissim. Cras ac iaculis metus. Vivamus hendrerit accumsan lobortis. 
    Ut fermentum in sem sed gravida. Curabitur luctus molestie purus vel pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    In id tempus nunc. Pellentesque eu ex in nisl sagittis finibus. Suspendisse risus lacus, vestibulum non facilisis pulvinar, gravida a mi.</p>

    Nunc fermentum quam eget mauris lacinia scelerisque. Morbi pretium varius ante porta fermentum. Etiam vulputate libero a augue aliquam 
    scelerisque. Etiam vitae ipsum facilisis, efficitur augue non, consequat ligula. Sed tincidunt consectetur blandit. Pellentesque dictum 
    consequat metus, eu consectetur tellus congue sit amet. Aenean nunc urna, aliquet at vulputate a, varius nec lacus. Nulla ut urna ac nisi 
    dapibus lacinia. Proin at felis porttitor, hendrerit nisi vel, ornare ante. In rutrum turpis quis augue ultrices, in lobortis felis volutpat. 
    Proin ligula nulla, lacinia ac porttitor non, mollis a sem. Maecenas ultricies elit sed nibh luctus accumsan. Praesent at ex eget nulla 
    venenatis mattis.

    Proin vitae sollicitudin lorem. Donec at dictum risus, nec tempor orci. Quisque sagittis feugiat nisi sed tincidunt. Donec gravida, 
    mauris vel bibendum pretium, turpis risus hendrerit risus, rutrum commodo sapien odio sit amet nulla. Vivamus aliquet nisi malesuada tortor 
    egestas tristique. Nam sit amet pretium est, nec auctor velit. Donec rhoncus lorem sed tincidunt mattis. Ut ut congue eros, a commodo magna. 
    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sed vulputate tellus.

    Pellentesque mollis risus in neque tincidunt fermentum. Suspendisse at turpis nisi. Praesent non sem ut est ornare gravida eget non sem. 
    Vestibulum quis malesuada ligula, eu bibendum neque. Nulla molestie lacus feugiat lorem placerat semper. Etiam in neque a risus sodales 
    malesuada et id lorem. Integer fringilla vulputate risus, sit amet pulvinar nisl accumsan eu. Sed lacinia sodales ultrices. Maecenas sed metus
     pretium orci ultricies venenatis. Nulla vel viverra tortor. Etiam libero diam, pharetra gravida lorem ac, condimentum tincidunt quam.

    Vestibulum venenatis quis tortor at auctor. Mauris nec magna eget nisl volutpat facilisis. Mauris congue, erat vitae varius sollicitudin, 
    justo quam tristique ante, eu auctor velit augue mollis dolor. Nam at sem urna. Donec suscipit odio eget volutpat fermentum. Sed sit amet 
    enim massa. Pellentesque varius ex sit amet felis interdum semper. Nullam sit amet sem ac augue tincidunt imperdiet non sed magna. Fusce 
    fermentum, nisi sed accumsan vulputate, sapien eros scelerisque est, tincidunt vulputate ipsum velit in dui. Integer risus velit, mattis 
    sed mollis quis, ultricies in arcu. Sed tincidunt leo id feugiat volutpat. Nam quis lobortis purus. Suspendisse quis libero congue, porta 
    sapien convallis, consequat velit. Quisque urna turpis, dignissim id molestie at, blandit ac enim. 
    `,
  category: 'categoria-exemplo',
};

const mockRelatedArticles = [
    {
      id: '124',
      title: 'Artigo Relacionado 1',
      slug: 'relacionado-1',
      summary: 'Este é um resumo do artigo relacionado 1.',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'categoria-exemplo',
    },
    {
      id: '125',
      title: 'Artigo Relacionado 2',
      slug: 'relacionado-2',
      summary: 'Este é um resumo do artigo relacionado 2.',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'categoria-exemplo',
    },
  ];
  

const MockArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const articleContentRef = useRef(null);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setArticle(mockArticle);
      setRelatedArticles(mockRelatedArticles);
    }, 500);
  }, []);

  useEffect(() => {
    if (articleContentRef.current && article?.content) {
      const images = articleContentRef.current.querySelectorAll('img');
      const handleClick = (event) => setExpandedImage(event.target.src);
      images.forEach((img) => img.addEventListener('click', handleClick));
      return () => images.forEach((img) => img.removeEventListener('click', handleClick));
    }
  }, [article]);

  if (!article) return <div>Carregando mock...</div>;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url });
      } catch (e) {
        console.error('Erro ao compartilhar:', e);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <ArticleWrapper>
          <ArticleContainer>
            <TitleContainer>
              <h1>{article.title}</h1>
              <h2>{article.summary}</h2>
              <p>
                <i>{article.author} - {new Date(article.date).toLocaleDateString('pt-BR')}</i>
              </p>
            </TitleContainer>

            <ShareButton onClick={handleShare}>
              <Share2 /> Compartilhar
            </ShareButton>

            <div ref={articleContentRef} dangerouslySetInnerHTML={{ __html: article.content }} />

            {expandedImage && (
              <ModalOverlay onClick={() => setExpandedImage(null)}>
                <ModalImage src={expandedImage} alt="Imagem expandida" />
              </ModalOverlay>
            )}
          </ArticleContainer>
        </ArticleWrapper>

        {mockRelatedArticles.length > 0 && (
          <SidebarWrapper>
            <Sidebar articles={mockRelatedArticles} />
          </SidebarWrapper>
        )}
      </MainContent>
      <Footer />
    </Container>
  );
};

export default MockArticlePage;
